import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Square, Paperclip, Mic } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, onStop, isLoading }: Props) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 140) + "px";
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [text, adjustHeight]);

  // Keep focus after sending
  useEffect(() => {
    if (!isLoading) {
      textareaRef.current?.focus();
    }
  }, [isLoading]);

  const handleSend = () => {
    if (!text.trim() || isLoading) return;
    onSend(text.trim());
    setText("");
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-input-area">
      <div className="ai-input-container">
        <div className="ai-input-box">
          <button
            className="ai-msg-action-btn"
            title="Attach file (coming soon)"
            style={{ opacity: 0.4, cursor: "default" }}
            disabled
          >
            <Paperclip size={16} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Ask your AI tutor anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={false}
          />

          <div className="ai-input-actions">
            <button
              className="ai-msg-action-btn"
              title="Voice input (coming soon)"
              style={{ opacity: 0.4, cursor: "default" }}
              disabled
            >
              <Mic size={16} />
            </button>

            {isLoading ? (
              <button
                className="ai-stop-btn"
                onClick={onStop}
                title="Stop generating"
              >
                <Square size={14} />
              </button>
            ) : (
              <button
                className="ai-send-btn"
                onClick={handleSend}
                disabled={!text.trim()}
                title="Send message"
              >
                <Send size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="ai-input-hint">
          Press Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};