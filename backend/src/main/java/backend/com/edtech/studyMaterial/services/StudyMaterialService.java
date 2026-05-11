package backend.com.edtech.studyMaterial.services;

import backend.com.edtech.studyMaterial.dto.StudyMaterialDto;

import java.util.List;

public interface StudyMaterialService {

    StudyMaterialDto createMaterial(
            StudyMaterialDto dto
    );

    List<StudyMaterialDto>
    getAllMaterials();

    List<StudyMaterialDto>
    getMaterialsByBatch(
            Long batchId
    );

    List<StudyMaterialDto>
    searchMaterials(
            String keyword
    );

    void deleteMaterial(Long id);
}
