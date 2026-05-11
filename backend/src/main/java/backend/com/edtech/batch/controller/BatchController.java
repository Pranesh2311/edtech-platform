package backend.com.edtech.batch.controller;

import backend.com.edtech.batch.dto.BatchRequestDto;
import backend.com.edtech.batch.dto.BatchResponseDto;
import backend.com.edtech.batch.dto.StudentDto;
import backend.com.edtech.batch.services.BatchService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
@RequiredArgsConstructor
public class BatchController {

    private final BatchService batchService;

    @PostMapping
    public ResponseEntity<BatchResponseDto>
    createBatch(
            @RequestBody BatchRequestDto dto
    ) {

        return ResponseEntity.ok(
                batchService.createBatch(dto)
        );
    }

    @GetMapping
    public ResponseEntity<List<BatchResponseDto>>
    getAllBatches() {

        return ResponseEntity.ok(
                batchService.getAllBatches()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<BatchResponseDto>
    getBatchById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                batchService.getBatchById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<BatchResponseDto>
    updateBatch(
            @PathVariable Long id,
            @RequestBody BatchRequestDto dto
    ) {

        return ResponseEntity.ok(
                batchService.updateBatch(
                        id,
                        dto
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBatch(@PathVariable Long id) {

        batchService.deleteBatch(id);

        return ResponseEntity.ok(
                "Batch deleted successfully"
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<BatchResponseDto>> searchBatches(@RequestParam String keyword) {

        return ResponseEntity.ok(batchService.searchBatches(keyword));
    }

    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<BatchResponseDto>toggleBatchStatus(@PathVariable Long id) {

        return ResponseEntity.ok(
                batchService.toggleBatchStatus(
                        id
                )
        );
    }

    @PostMapping("/{batchId}/assign/{studentId}")
    public ResponseEntity<BatchResponseDto> assignStudent(@PathVariable Long batchId, @PathVariable Long studentId) {

        return ResponseEntity.ok(
                batchService.assignStudent(
                        batchId,
                        studentId
                )
        );
    }

    @DeleteMapping("/{batchId}/remove/{studentId}")
    public ResponseEntity<BatchResponseDto>
    removeStudent( @PathVariable Long batchId, @PathVariable Long studentId) {

        return ResponseEntity.ok(
                batchService.removeStudent(
                        batchId,
                        studentId
                )
        );
    }

    @GetMapping("/{batchId}/students")
    public ResponseEntity<List<StudentDto>> getStudentsByBatch(@PathVariable Long batchId) {

        return ResponseEntity.ok(
                batchService.getStudentsByBatch(
                        batchId
                )
        );
    }


}
