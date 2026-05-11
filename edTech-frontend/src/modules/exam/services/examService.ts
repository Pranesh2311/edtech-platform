import axios from "axios";

const BASE_URL = "http://localhost:8080/api/exams";

export const getAllExams = () => {
    return axios.get(BASE_URL);
};

export const createExam = (exam: any) => {
    return axios.post(BASE_URL, exam);
};

export const getExamById = (id: string | number) => {
    return axios.get(`${BASE_URL}/${id}`);
};

export const updateExam = (id: string | number, exam: any) => {
    return axios.put(`${BASE_URL}/${id}`, exam);
};

export const deleteExam = (id: string | number) => {
    return axios.delete(`${BASE_URL}/${id}`);
};