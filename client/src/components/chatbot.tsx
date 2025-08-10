import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/use-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const { messages, sendMessage, clearChat, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What is your experience with python?",
    "Tell me about your projects",
    "What technologies do you work with?",
    "What is your educational background?",
    "Where is Gufran located?",
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center`}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-w-[90vw] max-h-[80vh]"
          >
            <Card className="h-full backdrop-blur-md bg-black/90 border-white/20 shadow-2xl">
              <CardHeader className="bg-blue-600/20 border-b border-white/10 flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Bot className="text-blue-400" size={20} />
                  Ask me about GUFRAN
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)]">
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  {messages.length === 0 ? (
                    <div className="space-y-4">
                      <div className="text-center text-gray-400 mb-4">
                        <Bot className="mx-auto mb-2 text-blue-400" size={32} />
                        <p className="text-sm">
                          Hi! I'm here to answer questions about SYED GUFRAN HUSSAIN's background, skills, and experience. Ask me anything!
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Suggested questions:</p>
                        {suggestedQuestions.map((question, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setInputMessage(question);
                              sendMessage(question);
                            }}
                            className="w-full text-left p-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-gray-300"
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.isUser
                                ? "bg-blue-600 text-white"
                                : "bg-white/10 text-gray-100 border border-white/20"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {!message.isUser && (
                                <Bot className="text-blue-400 mt-1" size={16} />
                              )}
                              {message.isUser && (
                                <User className="text-white mt-1" size={16} />
                              )}
                              <div className="flex-1">
                                <p className="text-sm whitespace-pre-wrap">
                                  {message.isUser ? message.message : message.response}
                                </p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white/10 border border-white/20 rounded-lg p-3 max-w-[80%]">
                            <div className="flex items-center gap-2">
                              <Bot className="text-blue-400" size={16} />
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Gufran..."
                      className="bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}