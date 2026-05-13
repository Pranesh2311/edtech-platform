import { motion } from "framer-motion";
import { Bot, BookOpen, Code, Lightbulb, GraduationCap } from "lucide-react";

interface Props {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  {
    icon: <BookOpen size={16} />,
    title: "Explain a concept",
    desc: "Break down complex topics simply",
    prompt: "Explain the concept of Object-Oriented Programming with examples",
  },
  {
    icon: <Code size={16} />,
    title: "Debug my code",
    desc: "Find and fix issues in your code",
    prompt: "Help me understand and debug this code snippet",
  },
  {
    icon: <Lightbulb size={16} />,
    title: "Learning roadmap",
    desc: "Get a personalized study plan",
    prompt: "Create a learning roadmap for becoming a full-stack developer",
  },
  {
    icon: <GraduationCap size={16} />,
    title: "Practice questions",
    desc: "Test your knowledge on any topic",
    prompt: "Give me 5 practice questions on Data Structures and Algorithms",
  },
];

export const EmptyChatState = ({ onSuggestionClick }: Props) => (
  <motion.div
    className="ai-empty-state"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <motion.div
      className="ai-empty-icon"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Bot size={32} />
    </motion.div>

    <h2 className="ai-empty-title">How can I help you today?</h2>
    <p className="ai-empty-subtitle">
      I'm your AI tutor — ask me anything about your courses, concepts, coding
      problems, or exam preparation.
    </p>

    <div className="ai-suggestions-grid">
      {suggestions.map((s, i) => (
        <motion.button
          key={i}
          className="ai-suggestion-card"
          onClick={() => onSuggestionClick(s.prompt)}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="ai-suggestion-icon">{s.icon}</div>
          <div className="ai-suggestion-title">{s.title}</div>
          <div className="ai-suggestion-desc">{s.desc}</div>
        </motion.button>
      ))}
    </div>
  </motion.div>
);
