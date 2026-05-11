package backend.com.edtech.assignment.controller;

import backend.com.edtech.assignment.dto.AssignmentDto;
import backend.com.edtech.assignment.dto.AssignmentSubmissionDto;
import backend.com.edtech.assignment.services.AssignmentService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AssignmentController {

    private final
    AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<AssignmentDto>
    createAssignment(

            @RequestBody
            AssignmentDto dto
    ) {

        return ResponseEntity.ok(
                assignmentService
                        .createAssignment(dto)
        );
    }

    @GetMapping
    public ResponseEntity<List<AssignmentDto>>
    getAllAssignments() {

        return ResponseEntity.ok(
                assignmentService
                        .getAllAssignments()
        );
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<AssignmentDto>>
    getAssignmentsByBatch(

            @PathVariable Long batchId
    ) {

        return ResponseEntity.ok(
                assignmentService
                        .getAssignmentsByBatch(
                                batchId
                        )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteAssignment(
            @PathVariable Long id
    ) {

        assignmentService.deleteAssignment(id);

        return ResponseEntity.ok(
                "Assignment Deleted"
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<AssignmentDto>>
    searchAssignments(

            @RequestParam String keyword
    ) {

        return ResponseEntity.ok(
                assignmentService
                        .searchAssignments(
                                keyword
                        )
        );
    }

    @PostMapping("/submit")
    public ResponseEntity<AssignmentSubmissionDto>
    submitAssignment(

            @RequestBody
            AssignmentSubmissionDto dto
    ) {

        return ResponseEntity.ok(
                assignmentService
                        .submitAssignment(
                                dto
                        )
        );
    }

    @GetMapping("/{assignmentId}/submissions")
    public ResponseEntity<
            List<AssignmentSubmissionDto>
            >
    getAssignmentSubmissions(

            @PathVariable Long assignmentId
    ) {

        return ResponseEntity.ok(
                assignmentService
                        .getAssignmentSubmissions(
                                assignmentId
                        )
        );
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<
            List<AssignmentSubmissionDto>
            >
    getStudentSubmissions(

            @PathVariable Long studentId
    ) {

        return ResponseEntity.ok(
                assignmentService
                        .getStudentSubmissions(
                                studentId
                        )
        );
    }
}
