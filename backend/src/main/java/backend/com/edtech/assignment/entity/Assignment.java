package backend.com.edtech.assignment.entity;

import backend.com.edtech.batch.entity.Batch;
import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;

import java.util.List;

@Entity
@Table(name = "assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assignment {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    private String title;

    @Column(length = 5000)
    private String description;

    private String assignmentFileUrl;

    private LocalDate deadline;

    private Integer maxMarks;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;

    @OneToMany(
            mappedBy = "assignment",
            cascade = CascadeType.ALL
    )
    private List<AssignmentSubmission>
            submissions;
}
