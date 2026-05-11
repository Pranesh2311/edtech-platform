package backend.com.edtech.batch.repository;

import backend.com.edtech.batch.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BatchRepository extends JpaRepository<Batch, Long> {
    List<Batch> findByBatchNameContainingIgnoreCase(
            String keyword
    );
}
