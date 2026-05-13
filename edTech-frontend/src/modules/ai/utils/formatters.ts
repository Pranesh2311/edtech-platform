import type { ChatSession, SessionGroup } from "../types/chat";

export const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const generateSessionTitle = (firstMessage: string): string => {
  const cleaned = firstMessage.trim().replace(/\n/g, " ");
  if (cleaned.length <= 40) return cleaned;
  return cleaned.substring(0, 40).trim() + "…";
};

export const groupSessionsByDate = (sessions: ChatSession[]): SessionGroup[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groups: SessionGroup[] = [
    { label: "Today", sessions: [] },
    { label: "Yesterday", sessions: [] },
    { label: "Previous", sessions: [] },
  ];

  const sorted = [...sessions].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  for (const session of sorted) {
    const sessionDate = new Date(session.updatedAt);
    if (sessionDate >= today) {
      groups[0].sessions.push(session);
    } else if (sessionDate >= yesterday) {
      groups[1].sessions.push(session);
    } else {
      groups[2].sessions.push(session);
    }
  }

  return groups.filter((g) => g.sessions.length > 0);
};

export const truncateSessionId = (id: string): string => {
  return id.slice(0, 8);
};
