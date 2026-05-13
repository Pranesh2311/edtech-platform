import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    deleteNotification,
    getNotifications,
    markAsRead
} from "../services/notificationApi";

import "./NotificationPage.css";

const NotificationPage = () => {

    const [notifications, setNotifications] =
        useState<any[]>([]);

    const navigate = useNavigate();

    const userId =
        Number(localStorage.getItem("userId"));

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications =
        async () => {

            try {

                const response =
                    await getNotifications(userId);

                setNotifications(
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };

    const handleDelete = async (id: number) => {

        await deleteNotification(id);

        loadNotifications();
    };

    const handleNotificationClick =
        async (notification: any) => {

            try {

                await markAsRead(notification.id);

                if (notification.actionUrl) {

                    navigate(notification.actionUrl);

                } else {

                    console.warn(
                        "No action URL found"
                    );
                }

            } catch(error) {

                console.error(error);
            }
        };

    return (

        <div className="container mt-4">

            <h2>Notifications</h2>

            {notifications.length === 0 ? (

                <p>No notifications found</p>

            ) : (

                notifications.map((n: any) => (

                    <div
                        key={n.id}
                        className="notification-card"
                        onClick={() => handleNotificationClick(n)}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            position: "relative"
                        }}
                    >

                        <div className="notification-header">

                            <h4>{n.title}</h4>

                            {!n.readStatus && (
                                <span
                                    className="unread-dot"
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        background: "red",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                        marginLeft: "10px"
                                    }}
                                />
                            )}

                        </div>

                        <p>{n.message}</p>

                        <button
                            className="delete-btn"
                            onClick={(e) => {

                                e.stopPropagation();

                                handleDelete(n.id);
                            }}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px"
                            }}
                        >
                            ✕
                        </button>

                        {!n.readStatus && (

                            <button
                                className="mark-as-read-btn"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    handleNotificationClick(n);
                                }}
                            >
                                Mark as Read
                            </button>

                        )}

                    </div>

                ))

            )}

        </div>
    );
};

export default NotificationPage;