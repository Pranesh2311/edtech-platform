import {
    useEffect,
    useState
} from "react";

import {
    getMySubscriptions
} from "../services/subscriptionApi";

const MySubscriptions = () => {

    const [subscriptions,
        setSubscriptions] =
            useState<any[]>([]);

    const studentId =
        Number(
            localStorage.getItem(
                "userId"
            )
        );

    useEffect(() => {

        fetchSubscriptions();

    }, []);

    const fetchSubscriptions =
        async () => {

            const response =
                await getMySubscriptions(
                    studentId
                );

            setSubscriptions(
                response.data
            );
        };

    return (

        <div className="container mt-4">

            <h3>
                My Subscriptions
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

                        <th>Batch</th>

                        <th>Plan</th>

                        <th>Expiry</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        subscriptions.map(sub => (

                            <tr key={sub.id}>

                                <td>
                                    {sub.id}
                                </td>

                                <td>
                                    {sub.batchName}
                                </td>

                                <td>
                                    {sub.planType}
                                </td>

                                <td>
                                    {sub.expiryDate}
                                </td>

                                <td>

                                    {
                                        sub.active
                                            ? (

                                                <span
                                                    className="
                                                        badge
                                                        bg-success
                                                    "
                                                >
                                                    Active
                                                </span>
                                            )
                                            : (

                                                <span
                                                    className="
                                                        badge
                                                        bg-danger
                                                    "
                                                >
                                                    Expired
                                                </span>
                                            )
                                    }

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};

export default MySubscriptions;