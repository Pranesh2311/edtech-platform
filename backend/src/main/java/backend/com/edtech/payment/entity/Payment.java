package backend.com.edtech.payment.entity;

import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.security.entity.User;
import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity

@Table(name = "payments")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;

    private String paymentId;

    private Double amount;

    private String status;

    private String paymentMethod;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;
}
