import { Bot, Trash2, Menu } from "lucide-react";
import { truncateSessionId } from "../utils/formatters";

interface Props {
  sessionId: string;
  onClearChat: () => void;
  onMenuClick: () => void;
}

export const ChatHeader = ({ sessionId, onClearChat, onMenuClick }: Props) => {
  return (
    <header className="ai-chat-header">
      <div className="ai-header-left">
        <button className="ai-header-menu-btn" onClick={onMenuClick}>
          <Menu size={18} />
        </button>

        <div className="ai-header-avatar">
          <Bot size={18} />
        </div>

        <div className="ai-header-info">
          <h2>AI Tutor</h2>
          <div className="ai-header-meta">
            <span className="ai-online-dot" />
            <span>Online</span>
            <span>·</span>
            <span>Session {truncateSessionId(sessionId)}</span>
          </div>
        </div>
      </div>

      <div className="ai-header-actions">
        <button className="ai-header-btn danger" onClick={onClearChat}>
          <Trash2 size={14} />
          <span>Clear</span>
        </button>
      </div>
    </header>
  );
};
