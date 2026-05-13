package backend.com.edtech.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChatRequestDto {

    @NotBlank(message = "Message is required")
    private String message;

    private String sessionId;

}
