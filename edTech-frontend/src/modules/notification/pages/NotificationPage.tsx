import { useEffect, useState } from "react";

import {
    getNotifications
} from "../services/notificationApi";

const NotificationPage = () => {

    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {

        const userId = localStorage.getItem("userId");

        loadNotifications(Number(userId));

    }, []);

    const loadNotifications =
        async (userId: number) => {

            try {

                const response = await getNotifications(userId);

                setNotifications(response.data);

            } catch (error) {

                console.error(error);
            }
        };

    return (

        <div className="container mt-4">

            <h3>Notifications</h3>

            {notifications.length === 0 && (
                <p>No notifications found</p>
            )}

            {notifications.map((n: any) => (

                <div key={n.id} className="card p-3 mb-3">

                    <h5>{n.title}</h5>
                    <p>{n.message}</p>

                </div>

            ))}

        </div>
    );
};

export default NotificationPage;