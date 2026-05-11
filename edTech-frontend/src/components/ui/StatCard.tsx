import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: 'primary' | 'accent' | 'cyan' | 'amber' | 'rose';
  delay?: number;
}

const StatCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  color = 'primary',
  delay = 0
}: StatCardProps) => {
  const getTrendIcon = () => {
    if (!change) return <Minus size={14} />;
    return change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
  };

  const getTrendClass = () => {
    if (!change) return 'neutral';
    return change > 0 ? 'positive' : 'negative';
  };

  return (
    <motion.div
      className={`stat-card stat-card-${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className={`stat-card-icon stat-icon-${color}`}>
          {icon}
        </div>
      </div>

      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        {change !== undefined && (
          <div className={`stat-card-change ${getTrendClass()}`}>
            {getTrendIcon()}
            <span>{Math.abs(change)}%</span>
            {changeLabel && <span className="change-label">{changeLabel}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
