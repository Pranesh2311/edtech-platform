package backend.com.edtech.result.repository;

import backend.com.edtech.question.entity.Question;
import backend.com.edtech.result.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Question> findByExamId(Long examId);
    List<Result> findByStudentEmail(String email);
}
