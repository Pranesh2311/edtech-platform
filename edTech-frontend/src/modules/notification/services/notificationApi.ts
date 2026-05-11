import api from "../../../services/api";

const API = "/notifications";

export const getNotifications =
    (userId: number) =>
        api.get(`${API}/user/${userId}`);

export const getUnreadCount =
    (userId: number) =>
        api.get(`${API}/unread/${userId}`);

export const markAsRead =
    (id: number) =>
        api.put(`${API}/${id}/read`);