package backend.com.edtech.payment.dto;

import lombok.Data;

@Data
public class PaymentVerifyDto {

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;

    private Long studentId;

    private Long batchId;

    private Double amount;
}
