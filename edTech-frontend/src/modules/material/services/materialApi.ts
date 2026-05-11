import axios from "axios";

const API =
    "http://localhost:8080/api/materials";

export const createMaterial =
    (data: any) =>
        axios.post(API, data);

export const getAllMaterials =
    () =>
        axios.get(API);

export const getMaterialsByBatch =
    (batchId: number) =>
        axios.get(
            `${API}/batch/${batchId}`
        );

export const searchMaterials =
    (keyword: string) =>
        axios.get(
            `${API}/search?keyword=${keyword}`
        );

export const deleteMaterial =
    (id: number) =>
        axios.delete(
            `${API}/${id}`
        );