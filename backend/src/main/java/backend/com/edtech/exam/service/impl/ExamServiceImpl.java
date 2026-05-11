package backend.com.edtech.exam.service.impl;

import backend.com.edtech.exam.dto.ExamRequestDto;
import backend.com.edtech.exam.entity.Exam;
import backend.com.edtech.exam.repository.ExamRepository;
import backend.com.edtech.exam.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;

    @Override
    public Exam createExam(ExamRequestDto dto) {

        Exam exam = Exam.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .duration(dto.getDuration())
                .totalMarks(dto.getTotalMarks())
                .active(dto.getActive())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .createdAt(LocalDateTime.now())
                .build();

        return examRepository.save(exam);
    }

    @Override
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    @Override
    public Exam getExamById(Long id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    @Override
    public Exam updateExam(Long id, ExamRequestDto dto) {

        Exam exam = getExamById(id);

        exam.setTitle(dto.getTitle());
        exam.setDescription(dto.getDescription());
        exam.setDuration(dto.getDuration());
        exam.setTotalMarks(dto.getTotalMarks());
        exam.setActive(dto.getActive());
        exam.setStartTime(dto.getStartTime());
        exam.setEndTime(dto.getEndTime());

        return examRepository.save(exam);
    }

    @Override
    public void deleteExam(Long id) {

        Exam exam = getExamById(id);

        examRepository.delete(exam);
    }
}
