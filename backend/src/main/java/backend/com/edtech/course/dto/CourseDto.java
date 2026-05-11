package backend.com.edtech.course.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {

    private Long id;

    private String title;

    private String description;

    private String thumbnail;

    private Double price;

    private Integer durationInMonths;

    private Boolean active;

    private Integer batchCount;
}
