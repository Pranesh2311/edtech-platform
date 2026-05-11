package backend.com.edtech.question.entity;

import backend.com.edtech.exam.entity.Exam;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String questionText;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String correctAnswer;

    private Integer marks;

    private String category;

    private String difficultyLevel;

    private String imageUrl;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;
}