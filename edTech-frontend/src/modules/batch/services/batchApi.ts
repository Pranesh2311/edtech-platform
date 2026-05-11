import axios from "axios";

const API = "http://localhost:8080/api/batches";

export const createBatch = (data: any) => axios.post(API, data);

export const getAllBatches = () => axios.get(API);

export const deleteBatch = (id: number) => axios.delete(`${API}/${id}`);

export const searchBatches = (keyword: string) => axios.get(`${API}/search?keyword=${keyword}`);

export const toggleBatchStatus = (id: number) => axios.put(`${API}/${id}/toggle-status`);

export const updateBatch = (id: number, data: any) => axios.put(`${API}/${id}`, data);

export const getBatchById = (id: number) => axios.get(`${API}/${id}`);

export const assignStudent =
    (
        batchId: number,
        studentId: number
    ) =>
        axios.post(
            `${API}/${batchId}/assign/${studentId}`
        );

export const removeStudent =
    (
        batchId: number,
        studentId: number
    ) =>
        axios.delete(
            `${API}/${batchId}/remove/${studentId}`
        );

export const getBatchStudents =
    (batchId: number) =>
        axios.get(
            `${API}/${batchId}/students`
        );