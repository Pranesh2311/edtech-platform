package backend.com.edtech.subscription.entity;

import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.security.entity.User;
import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    private LocalDate startDate;

    private LocalDate expiryDate;

    private Boolean active;

    private String planType;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;
}
