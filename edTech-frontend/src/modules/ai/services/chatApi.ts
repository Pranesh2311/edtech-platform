import axios from "axios";
import type { ChatRequestDto, ChatResponseDto } from "../types/chat";

const BASE_URL = "http://localhost:8080/api/ai";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Regular chat (POST)
export const sendChatMessage = async (
  request: ChatRequestDto
): Promise<ChatResponseDto> => {
  const { data } = await api.post<ChatResponseDto>("/chat", request);
  return data;
};

// Streaming chat (GET + SSE)
export const createStreamConnection = (
  message: string,
  sessionId: string,
  onMessage: (chunk: string) => void,
  onDone: () => void,
  onError: (err: Event) => void
): EventSource => {
  const url = `${BASE_URL}/stream?message=${encodeURIComponent(
    message
  )}&sessionId=${encodeURIComponent(sessionId)}`;
  const es = new EventSource(url);

  es.onmessage = (event) => onMessage(event.data);
  es.onerror = (err) => {
    onError(err);
    es.close();
    onDone();
  };

  return es;
};