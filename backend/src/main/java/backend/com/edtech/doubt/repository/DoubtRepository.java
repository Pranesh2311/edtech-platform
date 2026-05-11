package backend.com.edtech.doubt.repository;

import backend.com.edtech.doubt.entity.Doubt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoubtRepository extends JpaRepository<Doubt, Long> {

    List<Doubt> findByStudentId(Long studentId);

    List<Doubt> findBySolved(Boolean solved);
}
