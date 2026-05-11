import axios from "axios";

const API =
    "http://localhost:8080/api/courses";

export const createCourse =
    (data: any) =>
        axios.post(API, data);

export const getAllCourses =
    () =>
        axios.get(API);

export const getCourseById =
    (id: number) =>
        axios.get(`${API}/${id}`);

export const updateCourse =
    (id: number, data: any) =>
        axios.put(
            `${API}/${id}`,
            data
        );

export const deleteCourse =
    (id: number) =>
        axios.delete(
            `${API}/${id}`
        );

export const searchCourses =
    (keyword: string) =>
        axios.get(
            `${API}/search?keyword=${keyword}`
        );

export const toggleCourseStatus =
    (id: number) =>
        axios.put(
            `${API}/${id}/toggle-status`
        );