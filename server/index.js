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

console.log("Config Check (FORCED):");
console.log("- Host:", process.env.OLLAMA_HOST);
console.log("- Model:", process.env.OLLAMA_MODEL);

app.use(helmet());
app.use(cors());
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
- AI/ML: LLM Orchestration, RAG Architecture, Ollama, Vector DBs (ChromaDB), spaCy.
- Security: AES-256 Encryption, JWT, RBAC.
- Tools: Git, Docker, Firebase, PostgreSQL, MongoDB.

Highlights (Your Flex):
- "Fact vs Fiction": AI pipeline for fake news detection using RAG & ChromaDB. (Research project).
- "SecureVault": Military-grade encrypted cloud storage.
- "ShopSmart AI": Context-aware e-commerce recommendation system.
- "Multi App Dashboard": Modular PWA with zero-latency switching.
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
