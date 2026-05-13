package backend.com.edtech.ai.repository;

import backend.com.edtech.ai.entity.AiChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AiChatHistoryRepository extends JpaRepository<AiChatHistory, Long> {

    List<AiChatHistory> findBySessionIdOrderByCreatedAtAsc(String sessionId);

}
