package backend.com.edtech.payment.services.impl;

import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.batch.repository.BatchRepository;
import backend.com.edtech.exception.ResourceNotFoundException;
import backend.com.edtech.payment.dto.PaymentRequestDto;
import backend.com.edtech.payment.dto.PaymentVerifyDto;
import backend.com.edtech.payment.entity.Payment;
import backend.com.edtech.payment.repository.PaymentRepository;
import backend.com.edtech.payment.services.PaymentService;
import backend.com.edtech.security.entity.User;
import backend.com.edtech.security.repository.UserRepository;
import backend.com.edtech.subscription.entity.Subscription;
import backend.com.edtech.subscription.repository.SubscriptionRepository;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key}")
    private String razorpayKey;

    @Value("${razorpay.secret}")
    private String razorpaySecret;

    private final PaymentRepository paymentRepository;

    private final SubscriptionRepository subscriptionRepository;

    private final UserRepository userRepository;

    private final BatchRepository batchRepository;

    @Override
    public JSONObject createOrder(PaymentRequestDto dto) throws Exception {

        RazorpayClient client =
                new RazorpayClient(
                        razorpayKey,
                        razorpaySecret
                );

        JSONObject options =
                new JSONObject();

        options.put(
                "amount",
                dto.getAmount() * 100
        );

        options.put(
                "currency",
                "INR"
        );

        options.put(
                "receipt",
                "txn_" +
                        System.currentTimeMillis()
        );

        return new JSONObject(
                client.orders.create(options)
                        .toString()
        );
    }

    @Override
    public String verifyPayment(
            PaymentVerifyDto dto
    ) throws Exception {

        User student =
                userRepository.findById(
                        dto.getStudentId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found"
                        )
                );

        Batch batch =
                batchRepository.findById(
                        dto.getBatchId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Batch not found"
                        )
                );

        Payment payment =
                Payment.builder()

                        .orderId(
                                dto.getRazorpayOrderId()
                        )

                        .paymentId(
                                dto.getRazorpayPaymentId()
                        )

                        .amount(
                                dto.getAmount()
                        )

                        .status(
                                "SUCCESS"
                        )

                        .paymentMethod(
                                "RAZORPAY"
                        )

                        .createdAt(
                                LocalDateTime.now()
                        )

                        .student(student)

                        .batch(batch)

                        .build();

        paymentRepository.save(
                payment
        );

        Subscription subscription =
                Subscription.builder()

                        .student(student)

                        .batch(batch)

                        .startDate(
                                LocalDate.now()
                        )

                        .expiryDate(
                                LocalDate.now()
                                        .plusMonths(1)
                        )

                        .active(true)

                        .planType(
                                "MONTHLY"
                        )

                        .build();

        subscriptionRepository.save(
                subscription
        );

        return "Payment Verified & Subscription Activated";
    }
}