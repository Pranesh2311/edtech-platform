package backend.com.edtech.studyMaterial.controller;

import backend.com.edtech.studyMaterial.dto.StudyMaterialDto;
import backend.com.edtech.studyMaterial.services.StudyMaterialService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudyMaterialController {

    private final
    StudyMaterialService materialService;

    @PostMapping
    public ResponseEntity<StudyMaterialDto>
    createMaterial(

            @RequestBody
            StudyMaterialDto dto
    ) {

        return ResponseEntity.ok(
                materialService.createMaterial(
                        dto
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<StudyMaterialDto>>
    getAllMaterials() {

        return ResponseEntity.ok(
                materialService
                        .getAllMaterials()
        );
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<StudyMaterialDto>>
    getMaterialsByBatch(

            @PathVariable Long batchId
    ) {

        return ResponseEntity.ok(
                materialService
                        .getMaterialsByBatch(
                                batchId
                        )
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<StudyMaterialDto>>
    searchMaterials(

            @RequestParam String keyword
    ) {

        return ResponseEntity.ok(
                materialService.searchMaterials(
                        keyword
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteMaterial(
            @PathVariable Long id
    ) {

        materialService.deleteMaterial(id);

        return ResponseEntity.ok(
                "Material Deleted"
        );
    }
}
