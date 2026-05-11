package backend.com.edtech.batch.services;

import backend.com.edtech.batch.dto.BatchRequestDto;
import backend.com.edtech.batch.dto.BatchResponseDto;
import backend.com.edtech.batch.dto.StudentDto;

import java.util.List;

public interface BatchService {

    BatchResponseDto createBatch(
            BatchRequestDto dto
    );

    List<BatchResponseDto> getAllBatches();

    BatchResponseDto getBatchById(
            Long id
    );

    BatchResponseDto updateBatch(
            Long id,
            BatchRequestDto dto
    );

    void deleteBatch(Long id);

    List<BatchResponseDto> searchBatches(
            String keyword
    );

    BatchResponseDto toggleBatchStatus(
            Long id
    );

    BatchResponseDto assignStudent(
            Long batchId,
            Long studentId
    );

    BatchResponseDto removeStudent(
            Long batchId,
            Long studentId
    );

    List<StudentDto> getStudentsByBatch(
            Long batchId
    );


}
