package backend.com.edtech.doubt.services.impl;

import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.batch.repository.BatchRepository;
import backend.com.edtech.doubt.dto.CreateDoubtDto;
import backend.com.edtech.doubt.dto.DoubtResponseDto;
import backend.com.edtech.doubt.dto.ReplyDoubtDto;
import backend.com.edtech.doubt.entity.Doubt;
import backend.com.edtech.doubt.entity.DoubtReply;
import backend.com.edtech.doubt.repository.DoubtReplyRepository;
import backend.com.edtech.doubt.repository.DoubtRepository;
import backend.com.edtech.doubt.services.DoubtService;
import backend.com.edtech.exception.ResourceNotFoundException;
import backend.com.edtech.notification.dto.NotificationRequestDto;
import backend.com.edtech.notification.services.NotificationService;
import backend.com.edtech.security.entity.User;
import backend.com.edtech.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoubtServiceImpl implements DoubtService {

    private final DoubtRepository doubtRepository;

    private final DoubtReplyRepository replyRepository;

    private final UserRepository userRepository;

    private final BatchRepository batchRepository;

    private final NotificationService notificationService;

    @Override
    public Doubt createDoubt(CreateDoubtDto dto) {

        User student =
                userRepository.findById(
                        dto.getStudentId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found"
                        )
                );

        Batch batch =
                batchRepository.findById(
                        dto.getBatchId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Batch not found"
                        )
                );

        Doubt doubt =
                Doubt.builder()

                        .title(dto.getTitle())
                        .question(dto.getQuestion())
                        .student(student)
                        .batch(batch)
                        .solved(false)
                        .createdAt(
                                LocalDateTime.now()
                        )

                        .build();

        // SEND NOTIFICATION
        Long teacherId = batch.getTeacher().getId();

        NotificationRequestDto notificationDto = new NotificationRequestDto();

        notificationDto.setTitle("New Doubt Posted");
        notificationDto.setMessage(student.getFullName() + " posted a new doubt");
        notificationDto.setType("DOUBT");
        notificationDto.setUserId(teacherId);

        notificationService.createNotification(notificationDto);

        return doubtRepository.save(doubt);

    }

    @Override
    public List<DoubtResponseDto> getAllDoubts() {

        List<Doubt> doubts =
                doubtRepository.findAll();

        return doubts.stream()
                .map(d -> DoubtResponseDto.builder()
                        .id(d.getId())
                        .title(d.getTitle())
                        .question(d.getQuestion())
                        .solved(d.getSolved())
                        .studentName(
                                d.getStudent().getFullName()
                        )
                        .batchName(
                                d.getBatch().getBatchName()
                        )
                        .build()
                )
                .toList();
    }

    @Override
    public List<Doubt> getStudentDoubts(
            Long studentId
    ) {

        return doubtRepository.findByStudentId(
                studentId
        );
    }

    @Override
    public DoubtReply replyDoubt(
            Long doubtId,
            ReplyDoubtDto dto
    ) {

        Doubt doubt =
                doubtRepository.findById(
                        doubtId
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doubt not found"
                        )
                );

        User user =
                userRepository.findById(
                        dto.getUserId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        DoubtReply reply =
                DoubtReply.builder()

                        .reply(dto.getReply())

                        .createdAt(
                                LocalDateTime.now()
                        )

                        .doubt(doubt)

                        .user(user)

                        .build();

        return replyRepository.save(
                reply
        );
    }

    @Override
    public List<DoubtReply> getReplies(
            Long doubtId
    ) {

        return replyRepository.findByDoubtId(
                doubtId
        );
    }

    @Override
    public void markSolved(
            Long doubtId
    ) {

        Doubt doubt =
                doubtRepository.findById(
                        doubtId
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doubt not found"
                        )
                );

        doubt.setSolved(true);

        doubtRepository.save(
                doubt
        );
    }
}