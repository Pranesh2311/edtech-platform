import { memo } from "react";
import { motion } from "framer-motion";
import { Bot, User, RotateCcw } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../types/chat";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { CopyButton } from "./CopyButton";
import { formatTime } from "../utils/formatters";

interface Props {
  message: ChatMessageType;
  onRetry?: () => void;
}

export const MessageBubble = memo(({ message, onRetry }: Props) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`ai-message ${isUser ? "user" : "bot"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Avatar */}
      <div className={`ai-message-avatar ${isUser ? "human" : "bot"}`}>
        {isUser ? <User size={15} /> : <Bot size={15} />}
      </div>

      {/* Content */}
      <div className="ai-message-content">
        <div
          className={`ai-bubble ${isUser ? "user" : "bot"} ${
            message.isError ? "error" : ""
          }`}
        >
          {isUser ? (
            <span style={{ whiteSpace: "pre-wrap" }}>{message.content}</span>
          ) : (
            <>
              <MarkdownRenderer content={message.content} />
              {message.isStreaming && <span className="ai-streaming-cursor" />}
            </>
          )}
        </div>

        {/* Timestamp */}
        <div className="ai-message-time">{formatTime(message.timestamp)}</div>

        {/* Actions (bot messages only) */}
        {!isUser && !message.isStreaming && message.content && (
          <div className="ai-message-actions">
            <CopyButton
              text={message.content}
              className="ai-msg-action-btn"
              label="Copy"
            />
            {message.isError && onRetry && (
              <button className="ai-msg-action-btn" onClick={onRetry}>
                <RotateCcw size={13} />
                <span>Retry</span>
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});

MessageBubble.displayName = "MessageBubble";
