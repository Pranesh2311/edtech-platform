package backend.com.edtech.batch.entity;

import backend.com.edtech.assignment.entity.Assignment;
import backend.com.edtech.course.entity.Course;
import backend.com.edtech.security.entity.User;
import backend.com.edtech.studyMaterial.entity.StudyMaterial;
import backend.com.edtech.video.entity.Video;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "batches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String batchName;

    private String courseName;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double fees;

    private Integer capacity;

    @Column(name = "is_active")
    private Boolean active;

    /*
     * MANY BATCHES -> ONE TEACHER
     */
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @ManyToMany
    @JoinTable(
            name = "batch_students",
            joinColumns = @JoinColumn(name = "batch_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    @JsonIgnore
    private List<User> students;

    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<StudyMaterial> materials;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Assignment> assignments;

    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Video> videos;
}
