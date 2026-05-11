package backend.com.edtech.course.entity;

import backend.com.edtech.batch.entity.Batch;
import jakarta.persistence.*;

import lombok.*;

import java.util.List;

@Entity
@Table(name = "courses")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Course {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    private String title;

    @Column(length = 5000)
    private String description;

    private String thumbnail;

    private Double price;

    private Integer durationInMonths;

    private Boolean active;

    @OneToMany(
            mappedBy = "course",
            cascade = CascadeType.ALL
    )
    private List<Batch> batches;
}
