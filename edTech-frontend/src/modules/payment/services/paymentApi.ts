import axios from "axios";

const API =
    "http://localhost:8080/api/payments";

export const createOrder =
    (data: any) =>
        axios.post(
            `${API}/create-order`,
            data
        );

export const verifyPayment =
    (data: any) =>
        axios.post(
            `${API}/verify`,
            data
        );

export const getPaymentHistory =
    (studentId: number) =>
        axios.get(
            `${API}/history/${studentId}`
        );