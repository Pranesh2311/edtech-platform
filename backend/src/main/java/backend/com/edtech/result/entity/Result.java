package backend.com.edtech.result.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long examId;

    private String studentName;

    private String studentEmail;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Integer score;
}
