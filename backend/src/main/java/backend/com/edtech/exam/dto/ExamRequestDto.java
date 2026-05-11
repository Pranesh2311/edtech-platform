package backend.com.edtech.exam.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ExamRequestDto {

    private String title;

    private String description;

    private Integer duration;

    private Integer totalMarks;

    private Boolean active;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
}
