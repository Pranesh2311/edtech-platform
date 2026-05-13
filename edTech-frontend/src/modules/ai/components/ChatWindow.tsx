import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingLoader } from "./TypingLoader";
import { EmptyChatState } from "./EmptyChatState";

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
  onSuggestionClick: (text: string) => void;
  onRetry: () => void;
}

export const ChatWindow = ({
  messages,
  isLoading,
  onSuggestionClick,
  onRetry,
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="ai-messages-area">
        <EmptyChatState onSuggestionClick={onSuggestionClick} />
      </div>
    );
  }

  return (
    <div className="ai-messages-area">
      <div className="ai-messages-container">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onRetry={msg.isError ? onRetry : undefined}
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1]?.role === "user" && <TypingLoader />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};