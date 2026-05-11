import {
    useEffect,
    useState
} from "react";

import {
    getPaymentHistory
} from "../services/paymentApi";

const PaymentHistory = () => {

    const [payments,
        setPayments] =
            useState<any[]>([]);

    const studentId =
        Number(
            localStorage.getItem(
                "userId"
            )
        );

    useEffect(() => {

        fetchPayments();

    }, []);

    const fetchPayments =
        async () => {

            const response =
                await getPaymentHistory(
                    studentId
                );

            setPayments(
                response.data
            );
        };

    return (

        <div className="container mt-4">

            <h3>
                Payment History
            </h3>

            <table
                className="
                    table
                    table-bordered
                "
            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Amount</th>

                        <th>Status</th>

                        <th>Method</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        payments.map(payment => (

                            <tr key={payment.id}>

                                <td>
                                    {payment.id}
                                </td>

                                <td>
                                    ₹ {payment.amount}
                                </td>

                                <td>

                                    <span
                                        className="
                                            badge
                                            bg-success
                                        "
                                    >
                                        {payment.status}
                                    </span>

                                </td>

                                <td>
                                    {payment.paymentMethod}
                                </td>

                                <td>
                                    {payment.createdAt}
                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};

export default PaymentHistory;