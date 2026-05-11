import { useLocation } from "react-router-dom";

import {
    createOrder,
    verifyPayment
} from "../../payment/services/paymentApi";

declare global {

    interface Window {

        Razorpay: any;
    }
}

const BuyBatch = () => {

    const location =
        useLocation();

    const batch =
        location.state;

    const studentId =
        Number(
            localStorage.getItem(
                "userId"
            )
        );

    const handlePayment =
        async () => {

            try {

                const orderResponse =
                    await createOrder({

                        studentId,

                        batchId:
                            batch.id,

                        amount:
                            batch.fees
                    });

                const order =
                    JSON.parse(
                        orderResponse.data
                    );

                const options = {

                    key:
                        "YOUR_RAZORPAY_KEY",

                    amount:
                        order.amount,

                    currency:
                        order.currency,

                    name:
                        "Ed-Tech Platform",

                    description:
                        batch.batchName,

                    order_id:
                        order.id,

                    handler:
                        async (
                            response: any
                        ) => {

                            await verifyPayment({

                                razorpayOrderId:
                                    response.razorpay_order_id,

                                razorpayPaymentId:
                                    response.razorpay_payment_id,

                                razorpaySignature:
                                    response.razorpay_signature,

                                studentId,

                                batchId:
                                    batch.id,

                                amount:
                                    batch.fees
                            });

                            alert(
                                "Payment Success"
                            );
                        }
                };

                const razorpay =
                    new window.Razorpay(
                        options
                    );

                razorpay.open();

            } catch(error) {

                console.log(error);

                alert(
                    "Payment Failed"
                );
            }
        };

    return (

        <div className="container mt-5">

            <div
                className="
                    card
                    p-4
                    shadow
                "
            >

                <h3>
                    {batch.batchName}
                </h3>

                <p>
                    {batch.description}
                </p>

                <h4>

                    ₹ {batch.fees}

                </h4>

                <button
                    className="
                        btn
                        btn-success
                        mt-3
                    "
                    onClick={handlePayment}
                >
                    Buy Now
                </button>

            </div>

        </div>
    );
};

export default BuyBatch;