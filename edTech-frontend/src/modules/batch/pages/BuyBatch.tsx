import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, BookOpen, Clock, IndianRupee } from "lucide-react";

import { createOrder, verifyPayment } from "../../payment/services/paymentApi";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const BuyBatch = () => {
    const location = useLocation();
    const batch = location.state;

    const studentId = Number(localStorage.getItem("userId"));

    const handlePayment = async () => {
        try {
            const orderResponse = await createOrder({
                studentId,
                batchId: batch.id,
                amount: batch.fees
            });

            const order = JSON.parse(orderResponse.data);

            const options = {
                key: "YOUR_RAZORPAY_KEY",
                amount: order.amount,
                currency: order.currency,
                name: "Ed-Tech Platform",
                description: batch.batchName,
                order_id: order.id,
                handler: async (response: any) => {
                    await verifyPayment({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                        studentId,
                        batchId: batch.id,
                        amount: batch.fees
                    });
                    alert("Payment Success");
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.log(error);
            alert("Payment Failed");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h2>Enroll in Batch</h2>
                    <p>Review the details below before proceeding to payment</p>
                </div>
            </div>

            {/* Batch Detail Card */}
            <div className="premium-card" style={{ padding: '28px 24px', maxWidth: '560px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BookOpen size={20} color="var(--primary-color)" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {batch.batchName}
                    </h3>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                    {batch.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
                    <IndianRupee size={20} color="var(--text-primary)" />
                    <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {batch.fees}
                    </span>
                </div>

                <button className="btn-premium btn-filled" onClick={handlePayment} style={{ width: '100%', justifyContent: 'center' }}>
                    <ShoppingCart size={16} /> Buy Now
                </button>
            </div>
        </motion.div>
    );
};

export default BuyBatch;