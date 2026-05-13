package backend.com.edtech.ai.document.dto;

import lombok.Data;

@Data
public class AskDocumentRequestDto {

    private String question;

    private String sessionId;

}