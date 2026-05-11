import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const registerUser = (data: any) =>
    axios.post(`${API}/register`, data);

export const loginUser = (data: any) =>
    axios.post(`${API}/login`, data);

export const sendForgetPasswordLink = (email: string) =>
    axios.post(`${API}/forget-password`, { email });

export const getTeachers = () =>
    axios.get(`${API}/teachers`);