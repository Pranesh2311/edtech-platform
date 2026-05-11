package backend.com.edtech.video.services.impl;

import backend.com.edtech.batch.entity.Batch;
import backend.com.edtech.batch.repository.BatchRepository;
import backend.com.edtech.exception.ResourceNotFoundException;
import backend.com.edtech.video.dto.VideoDto;
import backend.com.edtech.video.entity.Video;
import backend.com.edtech.video.repository.VideoRepository;
import backend.com.edtech.video.services.VideoService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final
    VideoRepository videoRepository;

    private final
    BatchRepository batchRepository;

    @Override
    public VideoDto createVideo(
            VideoDto dto
    ) {

        Batch batch =
                batchRepository.findById(
                        dto.getBatchId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Batch not found"
                        )
                );

        Video video =
                Video.builder()

                        .title(dto.getTitle())

                        .description(
                                dto.getDescription()
                        )

                        .videoUrl(
                                dto.getVideoUrl()
                        )

                        .thumbnailUrl(
                                dto.getThumbnailUrl()
                        )

                        .duration(
                                dto.getDuration()
                        )

                        .active(true)

                        .freeVideo(
                                dto.getFreeVideo()
                        )

                        .batch(batch)

                        .build();

        return mapToDto(
                videoRepository.save(
                        video
                )
        );
    }

    @Override
    public List<VideoDto>
    getAllVideos() {

        return videoRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<VideoDto>
    getVideosByBatch(
            Long batchId
    ) {

        return videoRepository
                .findByBatchId(batchId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<VideoDto>
    searchVideos(
            String keyword
    ) {

        return videoRepository
                .findByTitleContainingIgnoreCase(
                        keyword
                )
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public VideoDto toggleStatus(
            Long id
    ) {

        Video video =
                videoRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Video not found"
                                )
                        );

        video.setActive(
                !video.getActive()
        );

        return mapToDto(
                videoRepository.save(
                        video
                )
        );
    }

    @Override
    public void deleteVideo(Long id) {

        videoRepository.deleteById(id);
    }

    private VideoDto mapToDto(
            Video video
    ) {

        return VideoDto.builder()

                .id(video.getId())

                .title(video.getTitle())

                .description(
                        video.getDescription()
                )

                .videoUrl(
                        video.getVideoUrl()
                )

                .thumbnailUrl(
                        video.getThumbnailUrl()
                )

                .duration(
                        video.getDuration()
                )

                .active(
                        video.getActive()
                )

                .freeVideo(
                        video.getFreeVideo()
                )

                .batchId(
                        video.getBatch()
                                .getId()
                )

                .batchName(
                        video.getBatch()
                                .getBatchName()
                )

                .build();
    }
}
