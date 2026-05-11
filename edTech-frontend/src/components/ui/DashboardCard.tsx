import { motion } from 'framer-motion';
import './DashboardCard.css';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  delay?: number;
}

const DashboardCard = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  noPadding = false,
  delay = 0
}: DashboardCardProps) => {
  return (
    <motion.div
      className={`dashboard-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <div className="dashboard-card-header">
        <div className="dashboard-card-header-text">
          <h3 className="dashboard-card-title">{title}</h3>
          {subtitle && <p className="dashboard-card-subtitle">{subtitle}</p>}
        </div>
        {action && <div className="dashboard-card-action">{action}</div>}
      </div>
      <div className={`dashboard-card-body ${noPadding ? 'no-padding' : ''}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardCard;
