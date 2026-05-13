import type { ChatSession, ChatMessage } from "../types/chat";

const STORAGE_KEY = "ai-tutor-sessions";
const ACTIVE_SESSION_KEY = "ai-tutor-active-session";

export const loadSessions = (): ChatSession[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatSession[];
    return parsed.map((s) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      updatedAt: new Date(s.updatedAt),
      messages: s.messages.map((m) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      })),
    }));
  } catch {
    return [];
  }
};

export const saveSessions = (sessions: ChatSession[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // Storage full — remove oldest sessions
    const trimmed = sessions.slice(0, Math.max(10, sessions.length - 5));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  }
};

export const saveActiveSessionId = (id: string): void => {
  localStorage.setItem(ACTIVE_SESSION_KEY, id);
};

export const loadActiveSessionId = (): string | null => {
  return localStorage.getItem(ACTIVE_SESSION_KEY);
};

export const updateSessionInStore = (
  sessionId: string,
  messages: ChatMessage[],
  title?: string
): void => {
  const sessions = loadSessions();
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx >= 0) {
    sessions[idx].messages = messages;
    sessions[idx].updatedAt = new Date();
    if (title) sessions[idx].title = title;
  } else {
    sessions.unshift({
      id: sessionId,
      title: title || "New Chat",
      messages,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  saveSessions(sessions);
};

export const deleteSessionFromStore = (sessionId: string): void => {
  const sessions = loadSessions().filter((s) => s.id !== sessionId);
  saveSessions(sessions);
};

export const clearAllSessions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ACTIVE_SESSION_KEY);
};
