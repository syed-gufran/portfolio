import { type ContactMessage, type InsertContactMessage, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createChatMessage(message: InsertChatMessage, response: string): Promise<ChatMessage>;
  getChatHistory(sessionId: string): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<string, ContactMessage>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.contactMessages = new Map();
    this.chatMessages = new Map();
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage, response: string): Promise<ChatMessage> {
    const id = randomUUID();
    const chatMessage: ChatMessage = {
      ...insertMessage,
      response,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

export const storage = new MemStorage();
