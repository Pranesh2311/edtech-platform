package backend.com.edtech.ai.controller;

import backend.com.edtech.ai.dto.ChatRequestDto;
import backend.com.edtech.ai.dto.ChatResponseDto;
import backend.com.edtech.ai.services.AiChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AiChatController {

    private final AiChatService aiChatService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponseDto> chat(
            @Valid @RequestBody ChatRequestDto request,
            Authentication authentication
    ) {

        // Temporary user ID
        Long userId = 1L;

        return ResponseEntity.ok(
                aiChatService.chat(
                        request,
                        userId
                )
        );

    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> streamChat(
            @RequestParam String message,
            @RequestParam String sessionId
    ) {

        Long userId = 1L;

        ChatRequestDto request = new ChatRequestDto();

        request.setMessage(message);
        request.setSessionId(sessionId);

        return aiChatService
                .streamChat(request, userId)
                .map(chunk ->
                        ServerSentEvent.<String>builder()
                                .data(chunk)
                                .build()
                );

    }

}
