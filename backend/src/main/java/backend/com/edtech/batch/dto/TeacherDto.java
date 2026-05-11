package backend.com.edtech.batch.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeacherDto {

    private Long id;

    private String name;
}
