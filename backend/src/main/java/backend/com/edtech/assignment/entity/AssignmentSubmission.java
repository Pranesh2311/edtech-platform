package backend.com.edtech.assignment.entity;

import backend.com.edtech.security.entity.User;
import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "assignment_submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignmentSubmission {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    private String answerFileUrl;

    private Integer obtainedMarks;

    private String feedback;

    private Boolean submitted;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;
}
