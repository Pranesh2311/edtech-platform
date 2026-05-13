package backend.com.edtech.ai.services;

import backend.com.edtech.ai.dto.ChatRequestDto;
import backend.com.edtech.ai.dto.ChatResponseDto;
import reactor.core.publisher.Flux;

public interface AiChatService {

    ChatResponseDto chat(ChatRequestDto request, Long userId);

    Flux<String> streamChat(ChatRequestDto request, Long userId);

}
