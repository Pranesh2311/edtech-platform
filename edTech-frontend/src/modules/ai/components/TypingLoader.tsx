import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export const TypingLoader = () => (
  <motion.div
    className="ai-typing-loader"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
  >
    <div className="ai-message-avatar bot">
      <Bot size={16} />
    </div>
    <div className="ai-typing-dots">
      <div className="ai-typing-dot" />
      <div className="ai-typing-dot" />
      <div className="ai-typing-dot" />
    </div>
  </motion.div>
);
