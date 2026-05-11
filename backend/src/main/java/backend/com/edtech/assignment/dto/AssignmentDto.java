package backend.com.edtech.assignment.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AssignmentDto {

    private Long id;

    private String title;

    private String description;

    private String assignmentFileUrl;

    private String deadline;

    private Integer maxMarks;

    private Long batchId;

    private String batchName;

    private Integer submissionCount;
}
