package backend.com.edtech.ai.document.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AskDocumentResponseDto {

    private String answer;

    private String context;

}
