import axios from "axios";

export const getStudents =
    () =>
        axios.get(
            "http://localhost:8080/api/auth/students"
        );