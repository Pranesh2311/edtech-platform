package backend.com.edtech.studyMaterial.repository;

import backend.com.edtech.studyMaterial.entity.StudyMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {

    List<StudyMaterial> findByBatchId(Long batchId);
    List<StudyMaterial> findByTitleContainingIgnoreCase(String keyword);
}
