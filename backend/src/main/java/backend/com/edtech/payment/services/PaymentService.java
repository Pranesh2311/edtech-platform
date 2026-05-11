package backend.com.edtech.payment.services;

import backend.com.edtech.payment.dto.PaymentRequestDto;
import backend.com.edtech.payment.dto.PaymentVerifyDto;
import org.json.JSONObject;

public interface PaymentService {

    JSONObject createOrder(
            PaymentRequestDto dto
    ) throws Exception;

    String verifyPayment(
            PaymentVerifyDto dto
    ) throws Exception;
}