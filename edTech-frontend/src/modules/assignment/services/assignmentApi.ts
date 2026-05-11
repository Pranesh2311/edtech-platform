import axios from "axios";

const API =
    "http://localhost:8080/api/assignments";

export const createAssignment =
    (data: any) =>
        axios.post(API, data);

export const getAllAssignments =
    () =>
        axios.get(API);

export const deleteAssignment =
    (id: number) =>
        axios.delete(
            `${API}/${id}`
        );

export const searchAssignments =
    (keyword: string) =>
        axios.get(
            `${API}/search?keyword=${keyword}`
        );

export const getAssignmentsByBatch =
    (batchId: number) =>
        axios.get(
            `${API}/batch/${batchId}`
        );

export const submitAssignment =
    (data: any) =>
        axios.post(
            `${API}/submit`,
            data
        );

export const getAssignmentSubmissions =
    (assignmentId: number) =>
        axios.get(
            `${API}/${assignmentId}/submissions`
        );

export const getStudentSubmissions =
    (studentId: number) =>
        axios.get(
            `${API}/student/${studentId}`
        );