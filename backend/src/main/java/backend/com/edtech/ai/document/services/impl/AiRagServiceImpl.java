package backend.com.edtech.ai.document.services.impl;

import backend.com.edtech.ai.document.dto.AskDocumentRequestDto;
import backend.com.edtech.ai.document.dto.AskDocumentResponseDto;
import backend.com.edtech.ai.document.services.AiRagService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
//import org.springframework.ai.vectorstore.SearchRequest;
//import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/*@Service
@RequiredArgsConstructor
public class AiRagServiceImpl implements AiRagService {

    private final VectorStore vectorStore;

    private final ChatClient chatClient;

    @Override
    public AskDocumentResponseDto askQuestion(
            AskDocumentRequestDto request
    ) {

        List<Document> documents =
                vectorStore.similaritySearch(
                        SearchRequest.builder()
                                .query(request.getQuestion())
                                .topK(5)
                                .build()
                );

        String context =
                documents.stream()
                        .map(Document::getText)
                        .collect(Collectors.joining("\n"));

        String prompt = """
                Answer the question ONLY from the provided context.
                
                Context:
                %s
                
                Question:
                %s
                """.formatted(
                context,
                request.getQuestion()
        );

        String answer =
                chatClient.prompt(prompt)
                        .call()
                        .content();

        return AskDocumentResponseDto.builder()
                .answer(answer)
                .context(context)
                .build();

    }

}*/
