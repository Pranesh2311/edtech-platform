import axios from "axios";

const BASE_URL = "http://localhost:8080/api/questions";

export const createQuestion = (question: any) => {
    return axios.post(BASE_URL, question);
};

export const getQuestionsByExam = (examId: number) => {
    return axios.get(`${BASE_URL}/exam/${examId}`);
};

export const updateQuestion = (
    id: number,
    question: any
) => {
    return axios.put(`${BASE_URL}/${id}`, question);
};

export const deleteQuestion = (id: number) => {
    return axios.delete(`${BASE_URL}/${id}`);
};