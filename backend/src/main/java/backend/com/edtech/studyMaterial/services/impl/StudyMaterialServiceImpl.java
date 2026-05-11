package backend.com.edtech.studyMaterial.services.impl;

import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.batch.repository.BatchRepository;
import backend.com.edtech.exception.ResourceNotFoundException;
import backend.com.edtech.studyMaterial.dto.StudyMaterialDto;
import backend.com.edtech.studyMaterial.entity.StudyMaterial;
import backend.com.edtech.studyMaterial.repository.StudyMaterialRepository;
import backend.com.edtech.studyMaterial.services.StudyMaterialService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class StudyMaterialServiceImpl
        implements StudyMaterialService {

    private final
    StudyMaterialRepository materialRepository;

    private final
    BatchRepository batchRepository;

    @Override
    public StudyMaterialDto createMaterial(
            StudyMaterialDto dto
    ) {

        Batch batch =
                batchRepository.findById(
                        dto.getBatchId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Batch not found"
                        )
                );

        StudyMaterial material =
                StudyMaterial.builder()

                        .title(dto.getTitle())

                        .description(
                                dto.getDescription()
                        )

                        .materialType(
                                dto.getMaterialType()
                        )

                        .fileUrl(dto.getFileUrl())

                        .videoUrl(dto.getVideoUrl())

                        .batch(batch)

                        .build();

        StudyMaterial saved =
                materialRepository.save(
                        material
                );

        return mapToDto(saved);
    }

    @Override
    public List<StudyMaterialDto>
    getAllMaterials() {

        return materialRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<StudyMaterialDto>
    getMaterialsByBatch(
            Long batchId
    ) {

        return materialRepository
                .findByBatchId(batchId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<StudyMaterialDto>
    searchMaterials(String keyword) {

        return materialRepository
                .findByTitleContainingIgnoreCase(
                        keyword
                )
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public void deleteMaterial(Long id) {

        materialRepository.deleteById(id);
    }

    private StudyMaterialDto mapToDto(
            StudyMaterial material
    ) {

        return StudyMaterialDto.builder()

                .id(material.getId())

                .title(material.getTitle())

                .description(
                        material.getDescription()
                )

                .materialType(
                        material.getMaterialType()
                )

                .fileUrl(
                        material.getFileUrl()
                )

                .videoUrl(
                        material.getVideoUrl()
                )

                .batchId(
                        material.getBatch().getId()
                )

                .batchName(
                        material.getBatch()
                                .getBatchName()
                )

                .build();
    }
}
