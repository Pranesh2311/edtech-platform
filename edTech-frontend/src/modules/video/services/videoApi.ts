import axios from "axios";

const API =
    "http://localhost:8080/api/videos";

export const createVideo =
    (data: any) =>
        axios.post(API, data);

export const getAllVideos =
    () =>
        axios.get(API);

export const deleteVideo =
    (id: number) =>
        axios.delete(
            `${API}/${id}`
        );

export const searchVideos =
    (keyword: string) =>
        axios.get(
            `${API}/search?keyword=${keyword}`
        );

export const toggleVideoStatus =
    (id: number) =>
        axios.put(
            `${API}/${id}/toggle`
        );

export const getVideosByBatch =
    (batchId: number) =>
        axios.get(
            `${API}/batch/${batchId}`
        );