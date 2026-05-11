package backend.com.edtech.question.service;

import backend.com.edtech.question.dto.QuestionRequestDto;
import backend.com.edtech.question.entity.Question;

import java.util.List;

public interface QuestionService {

    Question createQuestion(QuestionRequestDto dto);

    List<Question> getQuestionsByExam(Long examId);

    Question updateQuestion(Long id, QuestionRequestDto dto);

    void deleteQuestion(Long id);

}
