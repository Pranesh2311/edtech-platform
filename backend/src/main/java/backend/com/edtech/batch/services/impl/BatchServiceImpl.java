package backend.com.edtech.batch.services.impl;

import backend.com.edtech.batch.dto.BatchRequestDto;
import backend.com.edtech.batch.dto.BatchResponseDto;
import backend.com.edtech.batch.dto.StudentDto;
import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.batch.repository.BatchRepository;
import backend.com.edtech.batch.services.BatchService;
import backend.com.edtech.exception.BadRequestException;
import backend.com.edtech.exception.ResourceNotFoundException;
import backend.com.edtech.security.entity.User;
import backend.com.edtech.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BatchServiceImpl implements BatchService {

    private final BatchRepository batchRepository;

    private final UserRepository userRepository;

    @Override
    public BatchResponseDto createBatch(
            BatchRequestDto dto
    ) {

        if(dto.getTeacherId() == null) {

            throw new BadRequestException(
                    "Teacher ID is required"
            );
        }

        User teacher =
                userRepository.findById(
                        dto.getTeacherId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Teacher not found"
                        )
                );

        Batch batch = Batch.builder()
                .batchName(dto.getBatchName())
                .courseName(dto.getCourseName())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .fees(dto.getFees())
                .capacity(dto.getCapacity())
                .active(true)
                .teacher(teacher)
                .build();

        Batch saved =
                batchRepository.save(batch);

        return mapToDto(saved);
    }

    @Override
    public List<BatchResponseDto>
    getAllBatches() {

        return batchRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public BatchResponseDto
    getBatchById(Long id) {

        Batch batch =
                batchRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Batch not found"
                                )
                        );

        return mapToDto(batch);
    }

    @Override
    public BatchResponseDto updateBatch(
            Long id,
            BatchRequestDto dto
    ) {

        Batch batch =
                batchRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Batch not found"
                                )
                        );

        batch.setBatchName(dto.getBatchName());
        batch.setCourseName(dto.getCourseName());
        batch.setDescription(dto.getDescription());
        batch.setStartDate(dto.getStartDate());
        batch.setEndDate(dto.getEndDate());
        batch.setFees(dto.getFees());
        batch.setCapacity(dto.getCapacity());

        Batch updated =
                batchRepository.save(batch);

        return mapToDto(updated);
    }

    @Override
    public void deleteBatch(Long id) {

        Batch batch =
                batchRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Batch not found"
                                )
                        );

        batchRepository.delete(batch);
    }

    private BatchResponseDto mapToDto(Batch batch) {

        return BatchResponseDto.builder()
                .id(batch.getId())
                .batchName(batch.getBatchName())
                .courseName(batch.getCourseName())
                .description(batch.getDescription())
                .startDate(batch.getStartDate())
                .endDate(batch.getEndDate())
                .fees(batch.getFees())
                .capacity(batch.getCapacity())
                .active(batch.getActive())
                .teacherId(
                        batch.getTeacher() != null
                                ? batch.getTeacher().getId()
                                : null
                )
                .teacherName(
                        batch.getTeacher() != null
                                ? batch.getTeacher().getFullName()
                                : null
                ).studentCount(
                        batch.getStudents() != null
                                ? batch.getStudents().size()
                                : 0
                )
                .build();
    }

    @Override
    public List<BatchResponseDto> searchBatches(String keyword) {

        return batchRepository
                .findByBatchNameContainingIgnoreCase(
                        keyword
                )
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public BatchResponseDto toggleBatchStatus(Long id) {

        Batch batch =
                batchRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Batch not found"
                                )
                        );

        batch.setActive(!batch.getActive());

        Batch updated = batchRepository.save(batch);

        return mapToDto(updated);
    }

    @Override
    public BatchResponseDto assignStudent(Long batchId, Long studentId) {

        Batch batch =
                batchRepository.findById(batchId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Batch not found"
                                )
                        );

        User student =
                userRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student not found"
                                )
                        );

        boolean alreadyExists =
                batch.getStudents()
                        .stream()
                        .anyMatch(s ->
                                s.getId()
                                        .equals(studentId)
                        );

        if(alreadyExists) {

            throw new RuntimeException(
                    "Student already assigned"
            );
        }

        batch.getStudents()
                .add(student);

        Batch updated =
                batchRepository.save(batch);

        return mapToDto(updated);
    }

    @Override
    public BatchResponseDto removeStudent(
            Long batchId,
            Long studentId
    ) {

        Batch batch =
                batchRepository.findById(batchId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Batch not found"
                                )
                        );

        batch.getStudents()
                .removeIf(student ->
                        student.getId()
                                .equals(studentId)
                );

        Batch updated =
                batchRepository.save(batch);

        return mapToDto(updated);
    }

    @Override
    public List<StudentDto> getStudentsByBatch(Long batchId) {

        Batch batch =
                batchRepository.findById(batchId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Batch not found"
                                )
                        );

        return batch.getStudents()
                .stream()
                .map(student ->
                        StudentDto.builder()
                                .id(student.getId())
                                .name(student.getFullName())
                                .email(student.getEmail())
                                .build()
                )
                .toList();
    }
}
