package backend.com.edtech.payment.repository;

import backend.com.edtech.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository
        extends JpaRepository<
        Payment,
        Long
        > {

    List<Payment>
    findByStudentId(
            Long studentId
    );
}