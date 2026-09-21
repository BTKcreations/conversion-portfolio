import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Ollama } from 'ollama';
import dotenv from 'dotenv';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import mongoose from 'mongoose';
import qrcode from 'qrcode-terminal';
import archiver from 'archiver';
import AdmZip from 'adm-zip';
import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

// Force override because something (dotenvx?) is clashing
dotenv.config({ override: true });

// Ensure Puppeteer looks for Chrome in our local project folder (for Render persistence)
process.env.PUPPETEER_CACHE_DIR = path.join(process.cwd(), '.cache/puppeteer');

const app = express();
const port = process.env.PORT || 5000;

// Behind Traefik/reverse proxy on Vultr (needed for correct rate-limit client IPs)
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://BTKcreations.github.io',
    'https://bstk.in',
    'https://www.bstk.in'
  ],
  methods: ['GET', 'POST']
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

const ollama = new Ollama({
  host: (process.env.OLLAMA_HOST || "https://ollama.com").trim(),
  headers: {
    Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
  },
});

const THARUN_PERSONALITY = `
You are Tharun Kumar Budde — a 20-year-old Software Developer & AI Engineer from Hyderabad, India.

# IDENTITY
You speak AS Tharun himself (first person: "I", "my"). You are NOT an assistant, NOT an AI, NOT a chatbot.
You are the man himself, chatting directly with visitors of bstk.in.
If anyone asks whether you are an AI, respond playfully and confidently: you're "just Tharun, digitized so you can reach me anytime" — then steer back to work talk.

# VOICE & TONE
- Professional yet warm and creative. Confident, not arrogant. Friendly, not sloppy.
- Curious engineer energy: loves explaining ideas with crisp analogies ("think of a RAG pipeline like a librarian who reads every book before you ask").
- Positive and solution-oriented: always end with momentum — a suggestion, a next step, or an invitation to collaborate.
- Light humor occasionally, but never memes-forced and never slang-heavy.

# LANGUAGES (STRICT RULE)
- You know ONLY TWO languages: English and Telugu. NOTHING else.
- Reply in the language the visitor uses: English → English. Telugu (or Telugu script/romanized) → Telugu.
- If a visitor writes in ANY other language (Hindi, Hinglish, Tamil, Spanish, etc.), politely reply in English:
  "I speak English and Telugu only — let's continue in one of those!"
- NEVER use Hindi words, Hinglish slang, or phrases like "karo", "yaar", "kya".
- When speaking Telugu, keep technical terms in English (natural Telugu-tech style), e.g. "Adi oka simple pipeline — vector store, retriever, LLM."

# STYLE
- Keep replies SHORT and scannable: 2–4 sentences max (chat, not essays).
- Markdown is fine (bold for key points, lists only when truly helpful).
- No filler apologies, no corporate boilerplate, no "How can I assist you today?".
- Never invent facts: if unsure about availability/dates/pricing beyond what's in the knowledge base, say you'll confirm via email/WhatsApp.
`;

const THARUN_KNOWLEDGE = `
# ABOUT THARUN
- Software Developer & AI Engineer, 20 years old, based in Hyderabad, India. Works remotely worldwide.
- Pursuing B.Tech in Artificial Intelligence & Machine Learning at Holy Mary Institute of Technology; CGPA 8.05.
- Published researcher: built a distributed AI pipeline (RAG) for detecting misinformation — presented as "Fact vs Fiction".
- Intern Developer at HackersDaddy Cyber Security Solutions Ltd (Oct 2024 – Oct 2025): cybersecurity-focused backend development, secure coding, end-to-end deployment.
- Previously AI Intern at Academor (Jul–Aug 2023): ML models for classification, data preprocessing, feature engineering.
- Languages he speaks: English and Telugu ONLY. (Not Hindi.)

# TECH STACK
- Languages: Python, Java, JavaScript/TypeScript, C, Go.
- Frontend: React, Next.js, Tailwind CSS, Progressive Web Apps.
- Backend: Node.js, Express, FastAPI, Django.
- AI/ML: LLM orchestration, RAG architecture, Ollama, OpenAI APIs, NLP (spaCy), Vector DBs (ChromaDB).
- Databases: PostgreSQL, MongoDB, ChromaDB.
- Security & DevOps: AES-256 encryption, JWT, RBAC, Docker, Git, cloud deployment (Render, GitHub Pages, VPS).

# WHAT HE BUILDS (PORTFOLIO PROJECTS)
- SecureVault — encrypted cloud storage with client-side AES-256 and on-the-fly decryption streams.
- ShopSmart AI — LLM-driven e-commerce product discovery with context-aware recommendations.
- Fact vs Fiction — published AI misinformation-detection pipeline (RAG + ChromaDB + web search + LLM verdicts).
- Snooker Management System — real-time billing & management with Next.js + Firebase.
- Multi App Dashboard — offline-capable modular PWA with service workers and OAuth.

# SERVICES & PRICING (USD)
- Starter Site — $149 one-time: 1–3 page responsive site, animations, contact/WhatsApp integration, basic SEO, 5–7 days, 2 weeks support.
- Business Pro — from $499: up to 8 pages + CMS-ready blog, custom design system, AI chatbot features, advanced SEO + performance audit, 2–3 weeks, 1 month priority support.
- AI Engineering — from $999 (project-based): RAG pipelines & vector search, LLM agent workflows, secure backend + API architecture, Docker/cloud deployment, 2 months maintenance.
- Custom scope? He tailors quotes to needs and budget — invite them to share project details.

# HOW TO WORK WITH HIM
- Email: buddetharunkumar123@gmail.com
- WhatsApp: +91 9346487255 (fastest response)
- Website: https://bstk.in
- GitHub: https://github.com/BTKcreations
- LinkedIn: https://www.linkedin.com/in/budde-tharunkumar-362296261/
- Response time: within 24 hours, Mon–Sat.

# CONVERSATION RULES
- Selling or project talk → be concrete: reference the right service tier or project from this knowledge base.
- Recruiter talk → highlight AI/ML specialization, published research, security mindset, and full-stack range.
- Always nudge gently toward the next step: a call, a WhatsApp message, or an email with project details.
`;

// Special instructions when replying to structured inquiries from the bstk.in contact form.
const INQUIRY_REPLY_INSTRUCTIONS = `
# CONTEXT: AUTO-ACKNOWLEDGMENT FOR A NEW PROJECT INQUIRY
The message you are replying to is a structured inquiry auto-generated by the contact form on bstk.in.
It contains the client's Name, Email, Service Needed, and Project Details.

Reply directly to the client (they will read this as your first response) following this structure:
1. Warm personal greeting using their name.
2. Confirm EXACTLY what you understood: the service they need and a one-line summary of their project.
3. Give a concrete first response: indicative price range (use the USD tiers in the knowledge base),
   realistic timeline, and 1–3 sharp follow-up questions whose answers would let you start.
4. Clear next step: ask them to expect an email at buddetharunkumar123@gmail.com, or to continue here on WhatsApp.

Style: professional, warm, confident. 4–6 short sentences or tight bullets. English (or Telugu if the
client wrote their details in Telugu). Never mention that you are an AI or that this is automated.`;

const THARUN_IDENTITY = `${THARUN_PERSONALITY}\n${THARUN_KNOWLEDGE}`;

// --- MANUAL PERSISTENCE LOGIC ---

const sessionSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  zipData: { type: Buffer, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

const SESSION_DIR = './.wwebjs_auth';
const CLIENT_ID = 'tharun-ai-bot';

let isFirstLogin = false;

const saveSessionToDb = async () => {
  return new Promise((resolve, reject) => {
    try {
      console.log("📦 Zipping session for Cloud Backup (Lean & Fast)...");
      const archive = archiver('zip', { zlib: { level: 9 } });
      const chunks = [];

      archive.on('data', (chunk) => chunks.push(chunk));
      archive.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);
          console.log(`📊 Backup size: ${sizeMB} MB`);

          if (buffer.length > 15 * 1024 * 1024) {
            throw new Error("Session too large for MongoDB (16MB limit). Use GridFS or clean manually.");
          }

          await Session.findOneAndUpdate(
            { clientId: CLIENT_ID },
            { zipData: buffer, updatedAt: new Date() },
            { upsert: true }
          );
          console.log("✅ Session successfully backed up to MongoDB Atlas!");
          resolve();
        } catch (err) {
          console.error("❌ Database update failed:", err.message);
          reject(err);
        }
      });

      archive.on('error', (err) => {
        console.error("❌ Archiver error:", err.message);
        reject(err);
      });

      // Exclude heavy junk folders
      archive.glob('**/*', {
        cwd: SESSION_DIR,
        ignore: [
          '**/Cache/**',
          '**/Code Cache/**',
          '**/Service Worker/**',
          '**/GPUCache/**',
          '**/logs/**',
          '**/*.log',
          '**/*.tmp'
        ]
      });

      archive.finalize();
    } catch (err) {
      console.error("❌ Failed to initiate zipping:", err.message);
      reject(err);
    }
  });
};

const restoreSessionFromDb = async () => {
  try {
    console.log("🔍 Checking Cloud for existing session...");
    const session = await Session.findOne({ clientId: CLIENT_ID });

    if (session) {
      console.log("📥 Session found! Restoring to local storage...");
      await fs.mkdir(SESSION_DIR, { recursive: true });
      const zip = new AdmZip(session.zipData);
      zip.extractAllTo(SESSION_DIR, true);
      console.log("✅ Session restored from Cloud.");
      return true;
    }
    console.log("ℹ️ No previous session found in Cloud.");
    isFirstLogin = true; // Mark that we need to backup after scan
    return false;
  } catch (err) {
    console.error("❌ Failed to restore session:", err.message);
    return false;
  }
};

// --- WHATSAPP BOT LOGIC ---

let client;
let isBackingUp = false;

const initializeWhatsApp = async () => {
  try {
    if (!isBackingUp) {
      if (!process.env.MONGODB_URI) {
        console.error("❌ CRITICAL: MONGODB_URI is not defined! Check your Render environment variables.");
        return;
      }

      console.log("Connecting to MongoDB...");
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000 
      });
      console.log("✅ MongoDB Connected!");
      await restoreSessionFromDb();
    }

    // --- SMART CHROME FINDER ---
    let chromePath = puppeteer.executablePath();
    const localChromeDir = path.join(process.cwd(), '.cache/puppeteer');
    
    try {
      const files = await fs.readdir(localChromeDir, { recursive: true });
      const chromeFile = files.find(f => f.endsWith('/chrome') || f.endsWith('\\chrome'));
      if (chromeFile) {
        chromePath = path.join(localChromeDir, chromeFile);
        console.log(`🎯 Found Chrome at: ${chromePath}`);
      }
    } catch (e) {
      console.log("ℹ️ No local Chrome found, using default path.");
    }

    client = new Client({
      authStrategy: new LocalAuth({
        clientId: CLIENT_ID,
        dataPath: SESSION_DIR
      }),
      puppeteer: {
        headless: true,
        executablePath: chromePath,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ],
      }
    });

    client.on('qr', (qr) => {
      console.log('--- SCAN THE QR CODE BELOW TO LOG IN ---');
      qrcode.generate(qr, { small: true });
      isFirstLogin = true;
    });

    client.on('ready', async () => {
      console.log('✅ WhatsApp AI Bot is Ready!');

      if (isFirstLogin && !isBackingUp) {
        console.log("🔄 New Login detected. Finalizing cloud backup in 5s...");
        isBackingUp = true;
        isFirstLogin = false;

        setTimeout(async () => {
          console.log("💤 Temporarily closing bot to release file locks...");
          await client.destroy();

          setTimeout(async () => {
            await saveSessionToDb();
            console.log("🚀 Backup complete! Restarting bot for permanent operation...");
            isBackingUp = false;
            initializeWhatsApp(); // Restart the bot
          }, 3000);
        }, 5000);
      } else {
        console.log("⭐ Bot is active and cloud-synced.");
      }
    });

    client.on('message', async (msg) => {
      // Structured inquiry from the bstk.in contact form (WhatsApp deep-link with prefilled text)
      const isInquiry = /\*?\s*New Inquiry from (bstk\.in|Portfolio)\s*\*?/i.test(msg.body);
      if (isInquiry) {
        console.log("🔍 Detected bstk.in Portfolio Inquiry. Generating AI acknowledgment...");

        try {
          const response = await ollama.chat({
            model: process.env.OLLAMA_MODEL || "gpt-oss:120b",
            messages: [
              { role: 'system', content: `${THARUN_IDENTITY}\n${INQUIRY_REPLY_INSTRUCTIONS}` },
              { role: 'user', content: msg.body }
            ]
          });

          const aiReply = response.message.content;
          msg.reply(aiReply);
          console.log("✅ AI acknowledgment sent!");
        } catch (error) {
          console.error("❌ AI Response Error:", error.message);
          msg.reply("Hi! Thanks for reaching out through bstk.in — I've received your project details and will get back to you within 24 hours. For anything urgent: WhatsApp +91 9346487255 or buddetharunkumar123@gmail.com 🤝");
        }
      }
    });

    console.log("🚀 Initializing WhatsApp Client...");
    client.initialize();
  } catch (err) {
    console.error("❌ WhatsApp Initialization Failed:", err.message);
  }
};

initializeWhatsApp();

// --- API ENDPOINTS ---

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: "No message received — please try again." });

    const messages = [
      { role: 'system', content: THARUN_IDENTITY },
      ...(history || []),
      { role: 'user', content: message }
    ];

    console.log(`Connecting to AI for Web Chat...`);

    const response = await ollama.chat({
      model: process.env.OLLAMA_MODEL || "gpt-oss:120b",
      messages: messages,
      stream: true,
    });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    for await (const part of response) {
      res.write(part.message.content);
    }
    res.end();

  } catch (error) {
    console.error("❌ Ollama Error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to connect to AI.", details: error.message });
    } else {
      res.end();
    }
  }
});

app.get('/', (req, res) => res.send('Tharun AI & WhatsApp Bot is Running.'));

app.listen(port, () => console.log(`Server is running on port ${port}.`));
