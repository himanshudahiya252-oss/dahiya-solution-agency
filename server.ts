import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client on the server
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API endpoint for AI Content Assistant
  app.post("/api/gemini/assistant", async (req: express.Request, res: express.Response) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({ 
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY in Settings > Secrets." 
        });
      }
      
      if (!ai) {
        ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }

      const { prompt, option } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      let systemInstruction = "You are a senior tech writer, SEO marketer, and editorial manager for Dahiya Solution, a premium AI-powered digital agency. Write high-quality, professional, insightful content.";
      
      if (option === "outline") {
        systemInstruction += " Generate a structured, detailed blog article outline with Roman numerals for sections, sub-bullets, and a short summary of what each section will cover.";
      } else if (option === "headline") {
        systemInstruction += " Generate 5 extremely catchy, high-conversion SEO headlines/titles for the article topic. Include target keywords organically.";
      } else if (option === "meta") {
        systemInstruction += " Generate a compelling SEO Meta Description (under 160 characters) and 5-8 relevant, high-traffic SEO keywords/tags for this article.";
      } else if (option === "key_takeaways") {
        systemInstruction += " Generate 3-5 high-impact, professional Key Takeaways for the article draft/summary provided. Return them as a neat bulleted checklist.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || "";
      res.json({ result: text });
    } catch (error: any) {
      console.error("Gemini API Error in server.ts:", error);
      res.status(500).json({ error: error.message || "Internal server error during content generation" });
    }
  });

  // API endpoint for Contact Form
  app.post("/api/contact", async (req: express.Request, res: express.Response) => {
    const { name, email, phone, service, message, date } = req.body;
    const destEmail = process.env.CONTACT_DESTINATION_EMAIL || 'himanshudahiya252@gmail.com';
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Email configuration missing, cannot send email.");
      return res.status(500).json({ success: false, message: "Server email configuration missing." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: destEmail,
        subject: `New Enquiry from ${name} (${service})`,
        text: `New Enquiry Details:

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Submission Date: ${date}

Message:
${message}`,
      });
      res.json({ success: true, message: "Enquiry submitted successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send enquiry." });
    }
  });

  // Serve static assets or use Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
