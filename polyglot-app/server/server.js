import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';

const app = express();
app.use(cors()); // Allows your Vite frontend to talk to this server
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/translate', async (req, res) => {
  const { data, lang } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-5-mini', 
      messages: [
        { role: 'system', content: 'You are a language expert. Return only the translated text.' },
        { role: 'user', content: `Translate the following text ${data} to ${lang}` }
      ],
    });

    res.json({ translation: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));