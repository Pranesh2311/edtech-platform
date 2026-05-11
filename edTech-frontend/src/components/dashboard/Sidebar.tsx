import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Users, GraduationCap, FileText,
  Video, ClipboardList, BarChart3, HelpCircle, FolderOpen,
  ChevronLeft, ChevronRight, LogOut, X,
  Award, FileQuestion
} from 'lucide-react';
import './Sidebar.css';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  const fullName = localStorage.getItem('fullName') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    onMobileClose();
  };

  const adminNav: NavGroup[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
      ]
    },
    {
      title: 'Academic',
      items: [
        { label: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
        { label: 'Batches', path: '/batches', icon: <Users size={20} /> },
        { label: 'Exams', path: '/exams', icon: <ClipboardList size={20} /> },
        { label: 'Assignments', path: '/assignments', icon: <FileText size={20} /> },
      ]
    },
    {
      title: 'Content',
      items: [
        { label: 'Videos', path: '/videos', icon: <Video size={20} /> },
        { label: 'Materials', path: '/materials', icon: <FolderOpen size={20} /> },
      ]
    },
    {
      title: 'Analytics',
      items: [
        { label: 'Results', path: '/results', icon: <BarChart3 size={20} /> },
        { label: 'Students', path: '/student-results', icon: <GraduationCap size={20} /> },
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Doubts', path: '/doubts', icon: <HelpCircle size={20} /> },
      ]
    }
  ];

  const studentNav: NavGroup[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
      ]
    },
    {
      title: 'Learning',
      items: [
        { label: 'Mock Tests', path: '/exams', icon: <ClipboardList size={20} /> },
        { label: 'Videos', path: '/videos', icon: <Video size={20} /> },
        { label: 'Assignments', path: '/assignments', icon: <FileText size={20} /> },
      ]
    },
    {
      title: 'Performance',
      items: [
        { label: 'My Results', path: '/my-results', icon: <Award size={20} /> },
      ]
    },
    {
      title: 'Payments & Subscriptions',
      items: [
        { label: 'Subscriptions', path: '/subscriptions', icon: <BarChart3 size={20} /> },
        { label: 'Payments', path: '/payments', icon: <FileText size={20} /> },
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Doubts', path: '/doubts', icon: <HelpCircle size={20} /> },
      ]
    }
  ];

  const navGroups = (role === "ADMIN" || role === "TEACHER") ? adminNav : studentNav;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const sidebarContent = (
    <div className="sidebar-inner">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo" onClick={() => handleNavClick('/')}>
          <div className="logo-icon">
            <GraduationCap size={24} />
          </div>
          {!isCollapsed && (
            <motion.span
              className="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              EduFlow
            </motion.span>
          )}
        </div>
        <button className="sidebar-collapse-btn desktop-only" onClick={onToggle} title="Toggle sidebar">
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <button className="sidebar-close-btn mobile-only" onClick={onMobileClose}>
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navGroups.map((group, gi) => (
          <div className="nav-group" key={gi}>
            {!isCollapsed && (
              <div className="nav-group-title">{group.title}</div>
            )}
            {isCollapsed && gi > 0 && <div className="nav-divider" />}
            {group.items.map((item) => (
              <button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="nav-item-icon">{item.icon}</span>
                {!isCollapsed && (
                  <span className="nav-item-label">{item.label}</span>
                )}
                {isActive(item.path) && (
                  <motion.div
                    className="nav-active-indicator"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="sidebar-footer">
        <div className="sidebar-user" title={fullName}>
          <div className="user-avatar">
            {getInitials(fullName)}
          </div>
          {!isCollapsed && (
            <motion.div
              className="user-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="user-name">{fullName}</span>
              <span className="user-role">{role}</span>
            </motion.div>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`sidebar desktop-sidebar ${isCollapsed ? 'collapsed' : ''}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay + Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
            />
            <motion.aside
              className="sidebar mobile-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
