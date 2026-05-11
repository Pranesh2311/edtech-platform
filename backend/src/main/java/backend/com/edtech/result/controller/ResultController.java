package backend.com.edtech.result.controller;

import backend.com.edtech.question.entity.Question;
import backend.com.edtech.question.repositiry.QuestionRepository;
import backend.com.edtech.result.dto.SubmitTestDto;
import backend.com.edtech.result.entity.Result;
import backend.com.edtech.result.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    private final QuestionRepository questionRepository;

    private final ResultRepository resultRepository;

    @PostMapping("/submit")
    public Result submitTest(@RequestBody SubmitTestDto dto) {

        List<Question> questions = questionRepository.findByExamId(dto.getExamId());
        Map<Long, String> answers = dto.getAnswers();
        int totalScore = 0;
        int correctAnswers = 0;

        for(Question q : questions) {
            String selected = answers.get(q.getId());
            if(selected != null && selected.equals(q.getCorrectAnswer())) {
                totalScore += q.getMarks();
                correctAnswers++;
            }
        }

        Result result = new Result();

        result.setExamId(dto.getExamId());
        result.setStudentName(dto.getStudentName());
        result.setStudentEmail(dto.getStudentEmail());
        result.setTotalQuestions(questions.size());
        result.setCorrectAnswers(correctAnswers);
        result.setScore(totalScore);

        return resultRepository.save(result);
    }

    @GetMapping
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    @GetMapping("/student/{email}")
    public List<Result> getStudentResults(@PathVariable String email) {
        return resultRepository.findByStudentEmail(email);
    }
}
