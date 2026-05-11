import axios from "axios";

const API =
    "http://localhost:8080/api/subscriptions";

export const getMySubscriptions =
    (studentId: number) =>
        axios.get(
            `${API}/student/${studentId}`
        );