package backend.com.edtech.exam.service;

import backend.com.edtech.exam.dto.ExamRequestDto;
import backend.com.edtech.exam.entity.Exam;

import java.util.List;

public interface ExamService {

    Exam createExam(ExamRequestDto dto);

    List<Exam> getAllExams();

    Exam getExamById(Long id);

    Exam updateExam(Long id, ExamRequestDto dto);

    void deleteExam(Long id);
}
