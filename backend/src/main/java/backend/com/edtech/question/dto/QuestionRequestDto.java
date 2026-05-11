package backend.com.edtech.question.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class QuestionRequestDto {

    @NotBlank(message = "Question is required")
    private String questionText;

    @NotBlank(message = "Option A is required")
    private String optionA;

    @NotBlank(message = "Option B is required")
    private String optionB;

    @NotBlank(message = "Option C is required")
    private String optionC;

    @NotBlank(message = "Option D is required")
    private String optionD;

    @NotBlank(message = "Correct answer is required")
    private String correctAnswer;

    @NotNull(message = "Marks required")
    @Min(value = 1, message = "Marks must be greater than 0")
    private Integer marks;

    private String category;

    private String difficultyLevel;

    private String imageUrl;

    @NotNull(message = "Exam ID required")
    private Long examId;
}