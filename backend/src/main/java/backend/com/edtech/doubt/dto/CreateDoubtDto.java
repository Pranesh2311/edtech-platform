package backend.com.edtech.doubt.dto;

import lombok.Data;

@Data
public class CreateDoubtDto {

    private String title;

    private String question;

    private Long studentId;

    private Long batchId;
}
