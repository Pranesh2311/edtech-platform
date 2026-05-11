package backend.com.edtech.exam.controller;

import backend.com.edtech.exam.dto.ExamRequestDto;
import backend.com.edtech.exam.entity.Exam;
import backend.com.edtech.exam.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ExamController {

    private final ExamService examService;

    @PostMapping
    public Exam createExam(@RequestBody ExamRequestDto dto) {
        return examService.createExam(dto);
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    @PutMapping("/{id}")
    public Exam updateExam(
            @PathVariable Long id,
            @RequestBody ExamRequestDto dto
    ) {
        return examService.updateExam(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteExam(@PathVariable Long id) {

        examService.deleteExam(id);

        return "Exam deleted successfully";
    }
}
