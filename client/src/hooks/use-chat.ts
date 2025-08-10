import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export interface ChatMessage {
  id: string;
  message: string;
  response: string;
  isUser: boolean;
  timestamp: Date;
}

export interface UseChatProps {
  sessionId?: string;
}

export function useChat({ sessionId = "default" }: UseChatProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentSessionId] = useState(sessionId);
  const queryClient = useQueryClient();

  // Fetch chat history
  const { data: historyData } = useQuery({
    queryKey: ["chat-history", currentSessionId],
    queryFn: () =>
      fetch(`/api/chat/${currentSessionId}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Load history into messages
  useEffect(() => {
    if (historyData?.history) {
      const formattedHistory: ChatMessage[] = historyData.history.flatMap(
        (item: any, index: number) => [
          {
            id: `${item.id}-user-${index}`,
            message: item.message,
            response: "",
            isUser: true,
            timestamp: new Date(item.createdAt),
          },
          {
            id: `${item.id}-bot-${index}`,
            message: "",
            response: item.response,
            isUser: false,
            timestamp: new Date(item.createdAt),
          },
        ]
      );
      setMessages(formattedHistory);
    }
  }, [historyData]);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (message: string) =>
      apiRequest("POST", "/api/chat", {
        message,
        sessionId: currentSessionId,
      }),
    onMutate: (message: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message,
        response: "",
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
    },
    onSuccess: (data: any) => {
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        message: "",
        response: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      // Also refetch history to stay synced with backend
      queryClient.invalidateQueries(["chat-history", currentSessionId]);
    },
    onError: () => {
      setMessages((prev) => {
        const withoutLast = prev.slice(0, -1);
        return [
          ...withoutLast,
          {
            id: `error-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            message: "",
            response:
              "Sorry, I couldn't process your message. Please try again.",
            isUser: false,
            timestamp: new Date(),
          },
        ];
      });
    },
  });

  const sendMessage = (message: string) => {
    if (message.trim()) {
      sendMessageMutation.mutate(message.trim());
    }
  };

  const clearChat = () => {
    setMessages([]);
    queryClient.removeQueries(["chat-history", currentSessionId]);
  };

  return {
    messages,
    sendMessage,
    clearChat,
    isLoading: sendMessageMutation.isPending,
    sessionId: currentSessionId,
  };
}
