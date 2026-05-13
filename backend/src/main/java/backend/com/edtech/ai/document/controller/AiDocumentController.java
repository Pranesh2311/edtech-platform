package backend.com.edtech.ai.document.controller;

// import backend.com.edtech.ai.document.services.AiDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/*@RestController
@RequestMapping("/api/ai/document")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AiDocumentController {

    private final AiDocumentService documentService;

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> uploadDocument(
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        Long userId = 1L;

        documentService.uploadDocument(
                file,
                userId
        );

        return ResponseEntity.ok(
                "Document uploaded successfully"
        );

    }

}*/