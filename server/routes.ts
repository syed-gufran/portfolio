import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";
import { getFormattedContextForQuery } from "./cv-knowledge";  // updated import
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ 
        success: true, 
        message: "Message sent successfully",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          error: "Failed to send message" 
        });
      }
    }
  });

  // Chat endpoint with AI integration
  app.post("/api/chat", async (req, res) => {
    try {
      console.log("Received chat request:", req.body);
      const validatedData = insertChatMessageSchema.parse(req.body);
      const { message, sessionId } = validatedData;
      console.log("Validated data:", validatedData);

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({
          error: "OpenAI API key not configured"
        });
      }

      // Use improved context function here
      const context = getFormattedContextForQuery(message);

      const prompt = `You are SYED GUFRAN HUSSAIN's AI assistant. Use the context below to answer the question:\n\nContext:\n${context}\n\nQuestion:\n${message}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
      });

      const aiResponse = completion.choices[0].message?.content.trim() ?? "Sorry, I couldn't generate a response.";

      // Store chat message with AI response
      const chatMessage = await storage.createChatMessage(validatedData, aiResponse);

      res.json({
        success: true,
        response: aiResponse,
        messageId: chatMessage.id,
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Validation failed",
          details: error.errors
        });
      } else {
        console.error("Chat API error:", error);
        res.status(500).json({
          error: "Failed to process chat message"
        });
      }
    }
  });

  // Get chat history endpoint
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const history = await storage.getChatHistory(sessionId);
      res.json({ history });
    } catch (error) {
      console.error("Chat history error:", error);
      res.status(500).json({
        error: "Failed to retrieve chat history"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
