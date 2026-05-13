import { useState, useRef, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ChatMessage, ChatSession } from "../types/chat";
import { createStreamConnection } from "../services/chatApi";
import { generateSessionTitle } from "../utils/formatters";
import {
  loadSessions,
  saveSessions,
  saveActiveSessionId,
  loadActiveSessionId,
  updateSessionInStore,
  deleteSessionFromStore,
} from "../store/chatStore";

/*const fixSpacing = (prev: string, chunk: string): string => {

  if (!prev) return chunk;

  const lastChar = prev.slice(-1);
  const firstChar = chunk.charAt(0);

  // Don't add spaces before punctuation
  const punctuation = [".", ",", "!", "?", ";", ":", ")"];

  // Don't add after opening brackets
  const opening = ["(", "[", "{", "\n", " "];

  // If chunk already starts with space/newline
  if (firstChar === " " || firstChar === "\n") {
    return prev + chunk;
  }

  // If previous ends with space/newline
  if (lastChar === " " || lastChar === "\n") {
    return prev + chunk;
  }

  // Don't add before punctuation
  if (punctuation.includes(firstChar)) {
    return prev + chunk;
  }

  // Don't add after opening brackets
  if (opening.includes(lastChar)) {
    return prev + chunk;
  }

  // Add intelligent space
  return prev + " " + chunk;
};*/

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    return loadActiveSessionId() || uuidv4();
  });
  const [sessions, setSessions] = useState<ChatSession[]>(() => loadSessions());
  const [searchQuery, setSearchQuery] = useState("");

  const esRef = useRef<EventSource | null>(null);
  const abortRef = useRef(false);

  // Persist active session ID
  useEffect(() => {
    saveActiveSessionId(sessionId);
  }, [sessionId]);

  // Restore messages from session on mount / session switch
  useEffect(() => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
    } else {
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Persist messages to local storage when they change
  const persistMessages = useCallback(
    (msgs: ChatMessage[], sid: string) => {
      if (msgs.length === 0) return;
      const firstUserMsg = msgs.find((m) => m.role === "user");
      const title = firstUserMsg
        ? generateSessionTitle(firstUserMsg.content)
        : "New Chat";
      updateSessionInStore(sid, msgs, title);
      setSessions(loadSessions());
    },
    []
  );

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isLoading) return;

      abortRef.current = false;
      setIsLoading(true);

      const userMsg: ChatMessage = {
        id: uuidv4(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      const aiMsgId = uuidv4();
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        role: "ai",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => {
        const updated = [...prev, userMsg, aiMsg];
        return updated;
      });

      // Close any existing stream
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }

      esRef.current = createStreamConnection(
        text.trim(),
        sessionId,
        // onMessage — append chunk
        (chunk) => {
          if (abortRef.current) return;
          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            const last = updated[lastIdx];
            if (last?.role === "ai" && last.id === aiMsgId) {
              updated[lastIdx] = {
                ...last,
                //content: fixSpacing(last.content, chunk),
                content: last.content + chunk
              };
            }
            return updated;
          });
        },
        // onDone — streaming finished
        () => {
          setIsLoading(false);
          setMessages((prev) => {
            const updated = prev.map((m) =>
              m.id === aiMsgId ? { ...m, isStreaming: false } : m
            );
            persistMessages(updated, sessionId);
            return updated;
          });
          esRef.current = null;
        },
        // onError
        () => {
          setIsLoading(false);
          setMessages((prev) => {
            const updated = prev.map((m) =>
              m.id === aiMsgId
                ? {
                    ...m,
                    isStreaming: false,
                    isError: m.content.length === 0,
                    content:
                      m.content.length === 0
                        ? "Sorry, I encountered an error. Please try again."
                        : m.content,
                  }
                : m
            );
            persistMessages(updated, sessionId);
            return updated;
          });
          esRef.current = null;
        }
      );
    },
    [isLoading, sessionId, persistMessages]
  );

  const stopStreaming = useCallback(() => {
    abortRef.current = true;
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
    setIsLoading(false);
    setMessages((prev) => {
      const updated = prev.map((m) =>
        m.isStreaming ? { ...m, isStreaming: false } : m
      );
      persistMessages(updated, sessionId);
      return updated;
    });
  }, [sessionId, persistMessages]);

  const newChat = useCallback(() => {
    // Save current chat if has messages
    if (messages.length > 0) {
      persistMessages(messages, sessionId);
    }
    // Close existing stream
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
    setIsLoading(false);
    const newId = uuidv4();
    setSessionId(newId);
    setMessages([]);
    saveActiveSessionId(newId);
  }, [messages, sessionId, persistMessages]);

  const switchSession = useCallback(
    (targetSessionId: string) => {
      if (targetSessionId === sessionId) return;
      // Save current chat first
      if (messages.length > 0) {
        persistMessages(messages, sessionId);
      }
      // Close existing stream
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
      setIsLoading(false);
      setSessionId(targetSessionId);
    },
    [sessionId, messages, persistMessages]
  );

  const deleteSession = useCallback(
    (targetSessionId: string) => {
      deleteSessionFromStore(targetSessionId);
      setSessions(loadSessions());
      if (targetSessionId === sessionId) {
        newChat();
      }
    },
    [sessionId, newChat]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
    setIsLoading(false);
    deleteSessionFromStore(sessionId);
    setSessions(loadSessions());
  }, [sessionId]);

  const retryLastMessage = useCallback(() => {
    if (isLoading) return;
    // Find last user message
    const lastUserMsgIdx = [...messages]
      .reverse()
      .findIndex((m) => m.role === "user");
    if (lastUserMsgIdx === -1) return;

    const actualIdx = messages.length - 1 - lastUserMsgIdx;
    const lastUserMsg = messages[actualIdx];

    // Remove last AI message if it was an error
    setMessages((prev) => {
      const sliced = prev.slice(0, actualIdx);
      return sliced;
    });

    // Re-send
    setTimeout(() => sendMessage(lastUserMsg.content), 100);
  }, [messages, isLoading, sendMessage]);

  // Filtered sessions for search
  const filteredSessions = searchQuery.trim()
    ? sessions.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.messages.some((m) =>
            m.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : sessions;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (esRef.current) {
        esRef.current.close();
      }
    };
  }, []);

  return {
    messages,
    isLoading,
    sessionId,
    sessions: filteredSessions,
    searchQuery,
    setSearchQuery,
    sendMessage,
    stopStreaming,
    newChat,
    switchSession,
    deleteSession,
    clearChat,
    retryLastMessage,
  };
};