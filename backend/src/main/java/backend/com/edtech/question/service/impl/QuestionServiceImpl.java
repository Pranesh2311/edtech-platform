package backend.com.edtech.question.service.impl;

import backend.com.edtech.exam.entity.Exam;
import backend.com.edtech.exam.repository.ExamRepository;
import backend.com.edtech.question.dto.QuestionRequestDto;
import backend.com.edtech.question.entity.Question;
import backend.com.edtech.question.repositiry.QuestionRepository;
import backend.com.edtech.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    private final ExamRepository examRepository;

    @Override
    public Question createQuestion(QuestionRequestDto dto) {

        validateCorrectAnswer(dto);
        Exam exam = examRepository.findById(dto.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Question question = Question.builder()
                .questionText(dto.getQuestionText())
                .optionA(dto.getOptionA())
                .optionB(dto.getOptionB())
                .optionC(dto.getOptionC())
                .optionD(dto.getOptionD())
                .correctAnswer(dto.getCorrectAnswer())
                .marks(dto.getMarks())
                .category(dto.getCategory())
                .difficultyLevel(dto.getDifficultyLevel())
                .imageUrl(dto.getImageUrl())
                .exam(exam)
                .build();

        return questionRepository.save(question);
    }

    @Override
    public List<Question> getQuestionsByExam(Long examId) {

        return questionRepository.findByExamId(examId);
    }

    @Override
    public Question updateQuestion(Long id, QuestionRequestDto dto) {

        validateCorrectAnswer(dto);
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setQuestionText(dto.getQuestionText());
        question.setOptionA(dto.getOptionA());
        question.setOptionB(dto.getOptionB());
        question.setOptionC(dto.getOptionC());
        question.setOptionD(dto.getOptionD());
        question.setCorrectAnswer(dto.getCorrectAnswer());
        question.setMarks(dto.getMarks());
        question.setCategory(dto.getCategory());
        question.setDifficultyLevel(dto.getDifficultyLevel());
        question.setImageUrl(dto.getImageUrl());

        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Long id) {

        questionRepository.deleteById(id);
    }

    private void validateCorrectAnswer(QuestionRequestDto dto) {

        boolean valid =
                dto.getCorrectAnswer().equals("A") ||
                        dto.getCorrectAnswer().equals("B") ||
                        dto.getCorrectAnswer().equals("C") ||
                        dto.getCorrectAnswer().equals("D");

        if(!valid) {
            throw new RuntimeException("Correct answer must be A/B/C/D");
        }
    }

}
