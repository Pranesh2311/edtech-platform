import { useState, useCallback } from "react";
import { useChat } from "../hooks/useChat";
import { AiSidebar } from "../components/AiSidebar";
import { ChatHeader } from "../components/ChatHeader";
import { ChatWindow } from "../components/ChatWindow";
import { ChatInput } from "../components/ChatInput";
import "../styles/ai-tutor.css";

export const ChatPage = () => {
  const {
    messages,
    isLoading,
    sessionId,
    sessions,
    searchQuery,
    setSearchQuery,
    sendMessage,
    stopStreaming,
    newChat,
    switchSession,
    deleteSession,
    clearChat,
    retryLastMessage,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSuggestionClick = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  return (
    <div className="ai-tutor-layout">
      {/* Sidebar */}
      <AiSidebar
        sessions={sessions}
        activeSessionId={sessionId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewChat={() => {
          newChat();
          setSidebarOpen(false);
        }}
        onSelectSession={switchSession}
        onDeleteSession={deleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat */}
      <div className="ai-chat-main">
        <ChatHeader
          sessionId={sessionId}
          onClearChat={clearChat}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSuggestionClick={handleSuggestionClick}
          onRetry={retryLastMessage}
        />

        <ChatInput
          onSend={sendMessage}
          onStop={stopStreaming}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};