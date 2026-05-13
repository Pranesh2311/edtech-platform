package backend.com.edtech.ai.document.repository;

import backend.com.edtech.ai.document.entity.AiDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiDocumentRepository extends JpaRepository<AiDocument, Long> {
}
