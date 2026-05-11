package backend.com.edtech.assignment.services;

import backend.com.edtech.assignment.dto.AssignmentDto;
import backend.com.edtech.assignment.dto.AssignmentSubmissionDto;

import java.util.List;

public interface AssignmentService {

    AssignmentDto createAssignment(
            AssignmentDto dto
    );

    List<AssignmentDto>
    getAllAssignments();

    List<AssignmentDto>
    getAssignmentsByBatch(
            Long batchId
    );

    void deleteAssignment(Long id);

    List<AssignmentDto>
    searchAssignments(
            String keyword
    );

    AssignmentSubmissionDto
    submitAssignment(
            AssignmentSubmissionDto dto
    );

    List<AssignmentSubmissionDto>
    getAssignmentSubmissions(
            Long assignmentId
    );

    List<AssignmentSubmissionDto>
    getStudentSubmissions(
            Long studentId
    );
}
