package backend.com.edtech.assignment.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AssignmentSubmissionDto {

    private Long id;

    private String answerFileUrl;

    private Integer obtainedMarks;

    private String feedback;

    private Boolean submitted;

    private Long assignmentId;

    private String assignmentTitle;

    private Long studentId;

    private String studentName;
}
