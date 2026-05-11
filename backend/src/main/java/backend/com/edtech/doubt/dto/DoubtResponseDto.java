package backend.com.edtech.doubt.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoubtResponseDto {

    private Long id;

    private String title;

    private String question;

    private boolean solved;

    private String studentName;

    private String batchName;
}
