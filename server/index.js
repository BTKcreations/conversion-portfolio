import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Ollama } from 'ollama';
import dotenv from 'dotenv';

// Force override because something (dotenvx?) is clashing
dotenv.config({ override: true });

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

Your Services & Pricing:
- AI & RAG Integration (₹5,000+): Vector DBs, Smart Chatbots, LLM orchestration.
- Secure Full-Stack Apps (₹4,000+): Next.js/React + FastAPI/Node.js, Cloud deployment.
- Cybersecurity (₹3,000+): AES-256 Encryption, Secure Auth systems, API audits.
- Automation Scripts (₹1,000+): Python/Node.js zero-touch workflows.
- Web Scraping (₹1,500+): Anti-bot bypass, structured data delivery.
- Reverse Engineering (₹2,500+): Logic analysis and architecture reconstruction.

Highlights:
- "Fact vs Fiction": AI pipeline for fake news detection using RAG & ChromaDB.
- "SecureVault": Military-grade encrypted cloud storage.
- "ShopSmart AI": Context-aware e-commerce recommendation system.
`;

const THARUN_IDENTITY = `${THARUN_PERSONALITY}\n${THARUN_KNOWLEDGE}`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: "No message, bro." });

    const messages = [
      { role: 'system', content: THARUN_IDENTITY },
      ...(history || []),
      { role: 'user', content: message }
    ];

    console.log(`Connecting to: ${ollama.host}...`);

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
    console.error("Ollama Error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to connect to AI.", details: error.message });
    } else {
      res.end();
    }
  }
});

app.get('/', (req, res) => res.send('Tharun AI is ready.'));

app.listen(port, () => console.log(`Server is running on port ${port}.`));
