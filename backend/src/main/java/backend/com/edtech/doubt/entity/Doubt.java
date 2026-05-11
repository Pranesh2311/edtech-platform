package backend.com.edtech.doubt.entity;

import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.security.entity.User;
import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "doubts")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doubt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String question;

    private Boolean solved;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;
}