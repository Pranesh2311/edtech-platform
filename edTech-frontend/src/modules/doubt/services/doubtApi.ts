import api from "../../../services/api";

const API =
    "http://localhost:8080/api/doubts";

export const createDoubt =
    (data: any) =>
        api.post(API, data);

export const getAllDoubts =
    () =>
        api.get(API);

export const getStudentDoubts =
    (studentId: number) =>
        api.get(
            `${API}/student/${studentId}`
        );

export const replyDoubt =
    (
        doubtId: number,
        data: any
    ) =>
        api.post(
            `${API}/${doubtId}/reply`,
            data
        );

export const getReplies =
    (doubtId: number) =>
        api.get(
            `${API}/${doubtId}/replies`
        );

export const markSolved =
    (doubtId: number) =>
        api.put(
            `${API}/${doubtId}/solve`
        );