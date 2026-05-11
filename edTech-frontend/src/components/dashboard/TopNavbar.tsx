import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../contexts/ThemeContext';
import {
  Sun, Moon, Search, Bell, Menu,
  ChevronRight
} from 'lucide-react';
import './TopNavbar.css';
import { useEffect, useState } from 'react';
import { getUnreadCount } from '../../modules/notification/services/notificationApi';

interface TopNavbarProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

const TopNavbar = ({ onMenuClick, sidebarCollapsed }: TopNavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const fullName = localStorage.getItem('fullName') || 'User';
  const role = localStorage.getItem('role') || '';

  // Placeholder for notification count
  const [count, setCount] = useState(0);
  useEffect(() => {
      const userId = localStorage.getItem("userId");
      getUnreadCount(Number(userId)).then(res => setCount(res.data));

  }, []);
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const crumbs: string[] = ['Home'];

    if (path === '/') return crumbs;

    const segments = path.split('/').filter(Boolean);
    const routeMap: Record<string, string> = {
      'courses': 'Courses',
      'create-course': 'Create Course',
      'edit-course': 'Edit Course',
      'batches': 'Batches',
      'create-batch': 'Create Batch',
      'edit-batch': 'Edit Batch',
      'batch-students': 'Students',
      'exams': 'Exams',
      'create': 'Create Exam',
      'edit': 'Edit Exam',
      'questions': 'Questions',
      'assignments': 'Assignments',
      'create-assignment': 'Create Assignment',
      'assignment-submissions': 'Submissions',
      'submit-assignment': 'Submit',
      'videos': 'Videos',
      'create-video': 'Upload Video',
      'watch-video': 'Watch',
      'materials': 'Materials',
      'create-material': 'Create Material',
      'results': 'Results',
      'student-results': 'Student Results',
      'my-results': 'My Results',
      'attempt': 'Attempt Test',
    };

    segments.forEach(seg => {
      if (routeMap[seg]) {
        crumbs.push(routeMap[seg]);
      }
    });

    if (crumbs.length === 1) {
      crumbs.push(segments[0].charAt(0).toUpperCase() + segments[0].slice(1));
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const pageTitle = breadcrumbs[breadcrumbs.length - 1];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="top-navbar" style={{
      '--offset': sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'
    } as React.CSSProperties}>

      <div className="topbar-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={20} />
        </button>

        <div className="topbar-breadcrumbs">
          {location.pathname === '/' ? (
            <div className="topbar-greeting">
              <h1 className="greeting-text">{getGreeting()}, {fullName.split(' ')[0]}! 👋</h1>
              <p className="greeting-sub">Here's what's happening today</p>
            </div>
          ) : (
            <>
              <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="breadcrumb-item">
                    {i > 0 && <ChevronRight size={14} className="breadcrumb-sep" />}
                    <span className={i === breadcrumbs.length - 1 ? 'breadcrumb-current' : 'breadcrumb-link'}>
                      {crumb}
                    </span>
                  </span>
                ))}
              </nav>
              <h1 className="page-title">{pageTitle}</h1>
            </>
          )}
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <kbd className="search-shortcut">⌘K</kbd>
        </div>

        <button className="topbar-icon-btn" title="Notifications" 
          onClick={() => navigate("/notifications")}
        >
          <Bell size={18} />

          {count > 0 && (
            <span className="notification-dot">{count}</span>
          )}
        </button>

        <button
          className="topbar-icon-btn theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="topbar-profile">
          <div className="profile-avatar">
            {fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
