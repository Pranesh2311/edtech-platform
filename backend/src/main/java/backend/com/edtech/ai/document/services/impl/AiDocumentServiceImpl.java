package backend.com.edtech.ai.document.services.impl;


import backend.com.edtech.ai.document.entity.AiDocument;
import backend.com.edtech.ai.document.repository.AiDocumentRepository;
import backend.com.edtech.ai.document.services.AiDocumentService;
import backend.com.edtech.ai.document.services.PdfExtractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
//import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

/*@Service
@RequiredArgsConstructor
public class AiDocumentServiceImpl implements AiDocumentService {

    private final PdfExtractionService pdfExtractionService;

    private final VectorStore vectorStore;

    private final AiDocumentRepository repository;

    @Override
    public void uploadDocument(MultipartFile file, Long userId) throws Exception {

        String text = pdfExtractionService.extractText(file);

        Document document = new Document(text);

        vectorStore.add(List.of(document));

        AiDocument aiDocument = new AiDocument();

        aiDocument.setFileName(file.getOriginalFilename());
        aiDocument.setContentType(file.getContentType());
        aiDocument.setUploadedBy(userId);
        aiDocument.setUploadedAt(LocalDateTime.now());

        repository.save(aiDocument);

    }

}*/