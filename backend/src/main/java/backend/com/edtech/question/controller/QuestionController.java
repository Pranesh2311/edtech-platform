package backend.com.edtech.question.controller;

import backend.com.edtech.question.dto.QuestionRequestDto;
import backend.com.edtech.question.entity.Question;
import backend.com.edtech.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public Question createQuestion(
            @Valid @RequestBody QuestionRequestDto dto
    ) {
        return questionService.createQuestion(dto);
    }

    @GetMapping("/exam/{examId}")
    public List<Question> getQuestionsByExam(
            @PathVariable Long examId
    ) {
        return questionService.getQuestionsByExam(examId);
    }

    @PutMapping("/{id}")
    public Question updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionRequestDto dto
    ) {
        return questionService.updateQuestion(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return "Question deleted successfully";
    }
}
