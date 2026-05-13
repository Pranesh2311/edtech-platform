import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, Trash2, CheckCheck, BellOff, ExternalLink } from "lucide-react";

import {
    deleteNotification,
    getNotifications,
    markAsRead
} from "../services/notificationApi";

const NotificationPage = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem("userId"));

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const response = await getNotifications(userId);
            setNotifications(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteNotification(id);
        loadNotifications();
    };

    const handleNotificationClick = async (notification: any) => {
        try {
            await markAsRead(notification.id);
            if (notification.actionUrl) {
                navigate(notification.actionUrl);
            } else {
                console.warn("No action URL found");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const unreadCount = notifications.filter(n => !n.readStatus).length;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Notifications</h2>
                    <p>
                        {unreadCount > 0
                            ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                            : `${notifications.length} notification${notifications.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
            </div>

            {/* Notification Cards */}
            {notifications.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon"><BellOff size={28} /></div>
                    <div className="empty-state-title">No notifications</div>
                    <div className="empty-state-desc">You're all caught up! New notifications will appear here.</div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '780px' }}>
                    {notifications.map((n: any, index: number) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="premium-card"
                            onClick={() => handleNotificationClick(n)}
                            style={{
                                padding: '16px 20px',
                                cursor: 'pointer',
                                borderLeft: !n.readStatus
                                    ? '3px solid var(--primary-color)'
                                    : '3px solid var(--border-color)',
                                display: 'flex',
                                gap: '14px',
                                alignItems: 'flex-start',
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                flexShrink: 0,
                                background: !n.readStatus
                                    ? 'var(--primary-color)'
                                    : 'var(--bg-tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Bell
                                    size={16}
                                    color={!n.readStatus ? '#fff' : 'var(--text-secondary)'}
                                />
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {n.title}
                                    </span>
                                    {!n.readStatus && (
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            padding: '2px 8px',
                                            borderRadius: '20px',
                                            background: 'var(--primary-color)',
                                            color: '#fff',
                                            flexShrink: 0,
                                        }}>
                                            New
                                        </span>
                                    )}
                                </div>

                                <p style={{
                                    margin: '0 0 12px',
                                    fontSize: '13px',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.5'
                                }}>
                                    {n.message}
                                </p>

                                {/* Actions */}
                                <div
                                    style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {!n.readStatus && (
                                        <button
                                            className="btn-premium btn-outlined btn-sm"
                                            onClick={(e) => { e.stopPropagation(); handleNotificationClick(n); }}
                                        >
                                            <CheckCheck size={12} /> Mark as Read
                                        </button>
                                    )}
                                    {n.actionUrl && (
                                        <button
                                            className="btn-premium btn-outlined btn-sm"
                                            onClick={(e) => { e.stopPropagation(); handleNotificationClick(n); }}
                                        >
                                            <ExternalLink size={12} /> View
                                        </button>
                                    )}
                                    <button
                                        className="btn-premium btn-danger btn-sm"
                                        onClick={(e) => { e.stopPropagation(); handleDelete(n.id); }}
                                    >
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default NotificationPage;