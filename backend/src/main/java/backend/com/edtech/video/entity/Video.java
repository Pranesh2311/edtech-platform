package backend.com.edtech.video.entity;

import backend.com.edtech.batch.entity.Batch;
import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "videos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Video {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    private String title;

    @Column(length = 5000)
    private String description;

    private String videoUrl;

    private String thumbnailUrl;

    private Integer duration;

    private Boolean active;

    private Boolean freeVideo;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;
}
