package backend.com.edtech.batch.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BatchRequestDto {

    private String batchName;

    private String courseName;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double fees;

    private Integer capacity;

    private Long teacherId;
}