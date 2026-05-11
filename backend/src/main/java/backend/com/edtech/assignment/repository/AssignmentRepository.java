package backend.com.edtech.assignment.repository;

import backend.com.edtech.assignment.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByBatchId(Long batchId);
    List<Assignment> findByTitleContainingIgnoreCase(String keyword);
}
