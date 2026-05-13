package backend.com.edtech.ai.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatResponseDto {

    private String response;

    private String sessionId;

    private LocalDateTime timestamp;

}
