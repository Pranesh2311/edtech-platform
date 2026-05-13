export type MessageRole = "user" | "ai";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRequestDto {
  message: string;
  sessionId?: string;
}

export interface ChatResponseDto {
  response: string;
  sessionId: string;
  timestamp: string;
}

export interface SessionGroup {
  label: string;
  sessions: ChatSession[];
}