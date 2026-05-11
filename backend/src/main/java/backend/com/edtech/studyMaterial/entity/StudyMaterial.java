package backend.com.edtech.studyMaterial.entity;

import backend.com.edtech.batch.entity.Batch;
import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "study_materials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class StudyMaterial {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    private String title;

    private String description;

    private String materialType;

    private String fileUrl;

    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;
}
