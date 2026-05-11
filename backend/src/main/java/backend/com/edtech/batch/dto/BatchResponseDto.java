package backend.com.edtech.batch.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BatchResponseDto {

    private Long id;

    private String batchName;

    private String courseName;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double fees;

    private Integer capacity;

    private Boolean active;

    private String teacherName;

    private Long teacherId;

    private Integer studentCount;
}
