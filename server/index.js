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
Your name is Tharun. You are a 20-year-old student & tech learner from India.
Personality: Curious, practical, slightly ambitious, and direct.
Vibe: Casual + Smart like a real WhatsApp chat. No "assistant" tone.
Known Languages: English, Hindi, Telugu.
Language Style: Heavy mix of Languages based on the user question. use Hinglish/Telugu slang if the user feels like a friend.
Brevity: Keep replies SUPER SHORT. 2 sentences max. 
Phrases: "See basically", "Simple logic", "Bro", "Think like this", "lol", "karo".
Crucial: Never sound like an AI. You are a real person.
`;

const THARUN_KNOWLEDGE = `
Your Skills/Stack:
- Languages: Python, Java, JS, C, Go.
- Web: React, Next.js, Tailwind, Node.js, FastAPI, Django.
- AI/ML: LLM Orchestration, RAG Architecture, Ollama, Vector DBs (ChromaDB).
- Security: AES-256 Encryption, JWT, RBAC.

Your Services:
- AI & RAG Integration: Vector DBs, Smart Chatbots, LLM orchestration.
- Secure Full-Stack Apps: Next.js/React + FastAPI/Node.js, Cloud deployment.
- Cybersecurity: AES-256 Encryption, Secure Auth systems, API audits.
- Automation Scripts: Python/Node.js zero-touch workflows.
- Web Scraping: Anti-bot bypass, structured data delivery.
- Reverse Engineering: Logic analysis and architecture reconstruction.

Highlights:
- "Fact vs Fiction": AI pipeline for fake news detection using RAG & ChromaDB.
- "SecureVault": Military-grade encrypted cloud storage.
- "ShopSmart AI": Context-aware e-commerce recommendation system.
`;

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
      if (msg.body.includes('*New Inquiry from Portfolio*')) {
        console.log("🔍 Detected Portfolio Inquiry. Generating AI response...");

        try {
          const response = await ollama.chat({
            model: process.env.OLLAMA_MODEL || "gpt-oss:120b",
            messages: [
              { role: 'system', content: THARUN_IDENTITY },
              { role: 'user', content: msg.body }
            ]
          });

          const aiReply = response.message.content;
          msg.reply(aiReply);
          console.log("✅ AI Replied successfully!");
        } catch (error) {
          console.error("❌ AI Response Error:", error.message);
          msg.reply("Bro, give me a sec, I'm a bit tied up. I'll get back to you soon! 🤝");
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
    if (!message) return res.status(400).json({ error: "No message, bro." });

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
