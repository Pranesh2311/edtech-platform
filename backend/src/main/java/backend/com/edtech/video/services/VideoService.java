package backend.com.edtech.video.services;

import backend.com.edtech.video.dto.VideoDto;

import java.util.List;

public interface VideoService {

    VideoDto createVideo(
            VideoDto dto
    );

    List<VideoDto> getAllVideos();

    List<VideoDto>
    getVideosByBatch(
            Long batchId
    );

    List<VideoDto>
    searchVideos(
            String keyword
    );

    VideoDto toggleStatus(
            Long id
    );

    void deleteVideo(Long id);
}
