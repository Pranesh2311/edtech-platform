package backend.com.edtech.payment.controller;

import backend.com.edtech.payment.dto.PaymentRequestDto;
import backend.com.edtech.payment.dto.PaymentVerifyDto;
import backend.com.edtech.payment.services.PaymentService;
import lombok.RequiredArgsConstructor;

import org.json.JSONObject;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<String>
    createOrder(

            @RequestBody
            PaymentRequestDto dto
    ) throws Exception {

        JSONObject order =
                paymentService.createOrder(
                        dto
                );

        return ResponseEntity.ok(
                order.toString()
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<String>
    verifyPayment(@RequestBody PaymentVerifyDto dto) throws Exception {

        return ResponseEntity.ok(
                paymentService.verifyPayment(
                        dto
                )
        );
    }
}
