import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  MessageSquare,
  Trash2,
  Bot,
  ArrowLeft,
} from "lucide-react";
import type { ChatSession } from "../types/chat";
import { groupSessionsByDate } from "../utils/formatters";

interface Props {
  sessions: ChatSession[];
  activeSessionId: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AiSidebar = ({
  sessions,
  activeSessionId,
  searchQuery,
  onSearchChange,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  isOpen,
  onClose,
}: Props) => {
  const fullName = localStorage.getItem("fullName") || "User";
  const role = localStorage.getItem("role") || "Student";

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const groups = groupSessionsByDate(sessions);

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="ai-sidebar-header">
        <div className="ai-sidebar-brand">
          <div className="ai-brand-icon">
            <Bot size={20} />
          </div>
          <div className="ai-brand-text">
            <span className="ai-brand-name">AI Tutor</span>
            <span className="ai-brand-sub">EduFlow Assistant</span>
          </div>
        </div>

        <button className="ai-new-chat-btn" onClick={onNewChat}>
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="ai-search-box">
        <div className="ai-search-wrapper">
          <Search size={14} className="ai-search-icon" />
          <input
            type="text"
            className="ai-search-input"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Session List */}
      <div className="ai-session-list">
        {groups.length === 0 && (
          <div
            style={{
              padding: "24px 16px",
              textAlign: "center",
              color: "#4B5563",
              fontSize: "0.8rem",
            }}
          >
            No conversations yet
          </div>
        )}

        {groups.map((group) => (
          <div key={group.label}>
            <div className="ai-session-group-label">{group.label}</div>
            {group.sessions.map((session) => (
              <button
                key={session.id}
                className={`ai-session-item ${
                  session.id === activeSessionId ? "active" : ""
                }`}
                onClick={() => {
                  onSelectSession(session.id);
                  onClose();
                }}
              >
                <MessageSquare size={14} style={{ flexShrink: 0 }} />
                <span className="ai-session-title">{session.title}</span>
                <span
                  className="ai-session-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                >
                  <Trash2 size={13} />
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="ai-sidebar-footer">
        <div className="ai-sidebar-user">
          <div className="ai-user-avatar">{getInitials(fullName)}</div>
          <div className="ai-user-info">
            <div className="ai-user-name">{fullName}</div>
            <div className="ai-user-role">{role}</div>
          </div>
        </div>
        <button
          className="ai-header-btn"
          onClick={() => (window.location.href = "/")}
          style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
        >
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`ai-sidebar ${isOpen ? "open" : ""}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ display: window.innerWidth <= 768 ? "block" : "none" }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
