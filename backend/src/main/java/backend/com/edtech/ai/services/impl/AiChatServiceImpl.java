package backend.com.edtech.ai.services.impl;

import backend.com.edtech.ai.dto.ChatRequestDto;
import backend.com.edtech.ai.dto.ChatResponseDto;
import backend.com.edtech.ai.entity.AiChatHistory;
import backend.com.edtech.ai.repository.AiChatHistoryRepository;
import backend.com.edtech.ai.services.AiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AiChatServiceImpl implements AiChatService {

    private final ChatClient chatClient;

    private final AiChatHistoryRepository historyRepository;

    @Override
    public ChatResponseDto chat(ChatRequestDto request, Long userId) {

        String sessionId =
                request.getSessionId() != null
                        ? request.getSessionId()
                        : UUID.randomUUID().toString();

        // STEP 1:
        // Fetch Previous Conversations

        List<AiChatHistory> previousChats =
                historyRepository
                        .findBySessionIdOrderByCreatedAtAsc(
                                sessionId
                        );

        // STEP 2:
        // Build Conversation Memory

        String memoryContext = buildMemoryContext(previousChats);

        // STEP 3:
        // Build Final Prompt

        String finalPrompt =
                buildPrompt(
                        memoryContext,
                        request.getMessage()
                );

        // STEP 4:
        // Generate AI Response

        String aiResponse =
                chatClient.prompt()
                        .user(finalPrompt)
                        .call()
                        .content();

        // STEP 5:
        // Save Conversation

        AiChatHistory history = new AiChatHistory();

        history.setUserId(userId);
        history.setRole("USER");
        history.setMessage(request.getMessage());
        history.setResponse(aiResponse);
        history.setSessionId(sessionId);
        history.setCreatedAt(LocalDateTime.now());

        historyRepository.save(history);

        // STEP 6:
        // Return Response

        return ChatResponseDto.builder()
                .response(aiResponse)
                .sessionId(sessionId)
                .timestamp(LocalDateTime.now())
                .build();

    }

    // MEMORY CONTEXT BUILDER

    private String buildMemoryContext(List<AiChatHistory> chats) {

        StringBuilder memory = new StringBuilder();

        // Limit memory size
        int limit =
                Math.max(
                        0,
                        chats.size() - 10
                );

        for (int i = limit; i < chats.size(); i++) {

            AiChatHistory chat = chats.get(i);

            memory.append(
                    "User: "
            ).append(
                    chat.getMessage()
            ).append("\n");

            memory.append(
                    "AI: "
            ).append(
                    chat.getResponse()
            ).append("\n");

        }

        return memory.toString();

    }

    // FINAL PROMPT BUILDER

    private String buildPrompt(String memoryContext, String userMessage) {

        return """
                You are an intelligent AI tutor
                for an Ed-Tech platform.

                Your responsibilities:
                - Help students learn
                - Solve doubts
                - Explain concepts clearly
                - Maintain conversation continuity
                - Remember previous context

                Previous Conversation:
                """
                + memoryContext
                +
                """

                Current Student Question:
                """
                + userMessage;

    }

    @Override
    public Flux<String> streamChat(ChatRequestDto request, Long userId) {

        return chatClient.prompt()

                .system("""
                You are an AI assistant for EdTech platform.
                Help students with:
                - coding
                - doubts
                - learning
                - exams
                - roadmap
                - interview prep
                """)

                .user(request.getMessage())
                .stream()
                .content()
                // MUCH LARGER BUFFER
                .bufferTimeout(
                        100,
                        java.time.Duration.ofMillis(300)
                )

                .map(tokens -> String.join("", tokens))
                .filter(text -> !text.isBlank());
    }

}