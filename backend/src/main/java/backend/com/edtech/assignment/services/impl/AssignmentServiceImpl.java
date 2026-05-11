package backend.com.edtech.assignment.services.impl;

import backend.com.edtech.assignment.dto.AssignmentDto;
import backend.com.edtech.assignment.dto.AssignmentSubmissionDto;
import backend.com.edtech.assignment.entity.Assignment;
import backend.com.edtech.assignment.entity.AssignmentSubmission;
import backend.com.edtech.assignment.repository.AssignmentRepository;
import backend.com.edtech.assignment.repository.AssignmentSubmissionRepository;
import backend.com.edtech.assignment.services.AssignmentService;
import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.batch.repository.BatchRepository;
import backend.com.edtech.exception.ResourceNotFoundException;
import backend.com.edtech.security.entity.User;
import backend.com.edtech.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    private final AssignmentSubmissionRepository submissionRepository;

    private final BatchRepository batchRepository;

    private final UserRepository userRepository;

    @Override
    public AssignmentDto createAssignment(
            AssignmentDto dto
    ) {

        Batch batch =
                batchRepository.findById(
                        dto.getBatchId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Batch not found"
                        )
                );

        Assignment assignment =
                Assignment.builder()

                        .title(dto.getTitle())

                        .description(
                                dto.getDescription()
                        )

                        .assignmentFileUrl(
                                dto.getAssignmentFileUrl()
                        )

                        .deadline(
                                LocalDate.parse(
                                        dto.getDeadline()
                                )
                        )

                        .maxMarks(
                                dto.getMaxMarks()
                        )

                        .batch(batch)

                        .build();

        return mapToDto(
                assignmentRepository.save(
                        assignment
                )
        );
    }

    @Override
    public List<AssignmentDto>
    getAllAssignments() {

        return assignmentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<AssignmentDto>
    getAssignmentsByBatch(
            Long batchId
    ) {

        return assignmentRepository
                .findByBatchId(batchId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public void deleteAssignment(
            Long id
    ) {

        assignmentRepository.deleteById(id);
    }

    @Override
    public List<AssignmentDto>
    searchAssignments(
            String keyword
    ) {

        return assignmentRepository
                .findByTitleContainingIgnoreCase(
                        keyword
                )
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public AssignmentSubmissionDto
    submitAssignment(
            AssignmentSubmissionDto dto
    ) {

        Assignment assignment =
                assignmentRepository.findById(
                        dto.getAssignmentId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Assignment not found"
                        )
                );

        User student =
                userRepository.findById(
                        dto.getStudentId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found"
                        )
                );

        AssignmentSubmission submission =
                AssignmentSubmission.builder()

                        .answerFileUrl(
                                dto.getAnswerFileUrl()
                        )

                        .submitted(true)

                        .assignment(
                                assignment
                        )

                        .student(student)

                        .build();

        return mapSubmissionDto(
                submissionRepository.save(
                        submission
                )
        );
    }

    @Override
    public List<AssignmentSubmissionDto>
    getAssignmentSubmissions(
            Long assignmentId
    ) {

        return submissionRepository
                .findByAssignmentId(
                        assignmentId
                )
                .stream()
                .map(this::mapSubmissionDto)
                .toList();
    }

    @Override
    public List<AssignmentSubmissionDto>
    getStudentSubmissions(
            Long studentId
    ) {

        return submissionRepository
                .findByStudentId(
                        studentId
                )
                .stream()
                .map(this::mapSubmissionDto)
                .toList();
    }

    private AssignmentDto mapToDto(
            Assignment assignment
    ) {

        return AssignmentDto.builder()

                .id(assignment.getId())

                .title(
                        assignment.getTitle()
                )

                .description(
                        assignment.getDescription()
                )

                .assignmentFileUrl(
                        assignment.getAssignmentFileUrl()
                )

                .deadline(
                        assignment.getDeadline()
                                .toString()
                )

                .maxMarks(
                        assignment.getMaxMarks()
                )

                .batchId(
                        assignment.getBatch()
                                .getId()
                )

                .batchName(
                        assignment.getBatch()
                                .getBatchName()
                )

                .submissionCount(
                        assignment.getSubmissions() != null
                                ? assignment.getSubmissions().size()
                                : 0
                )

                .build();
    }

    private AssignmentSubmissionDto
    mapSubmissionDto(
            AssignmentSubmission submission
    ) {

        return AssignmentSubmissionDto
                .builder()

                .id(submission.getId())

                .answerFileUrl(
                        submission.getAnswerFileUrl()
                )

                .obtainedMarks(
                        submission.getObtainedMarks()
                )

                .feedback(
                        submission.getFeedback()
                )

                .submitted(
                        submission.getSubmitted()
                )

                .assignmentId(
                        submission.getAssignment()
                                .getId()
                )

                .assignmentTitle(
                        submission.getAssignment()
                                .getTitle()
                )

                .studentId(
                        submission.getStudent()
                                .getId()
                )

                .studentName(
                        submission.getStudent()
                                .getFullName()
                )

                .build();
    }
}
