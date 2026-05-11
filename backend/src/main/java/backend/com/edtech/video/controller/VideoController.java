package backend.com.edtech.video.controller;

import backend.com.edtech.video.dto.VideoDto;
import backend.com.edtech.video.services.VideoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VideoController {

    private final VideoService videoService;

    @PostMapping
    public ResponseEntity<VideoDto>
    createVideo(

            @RequestBody
            VideoDto dto
    ) {

        return ResponseEntity.ok(
                videoService.createVideo(
                        dto
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<VideoDto>>
    getAllVideos() {

        return ResponseEntity.ok(
                videoService.getAllVideos()
        );
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<VideoDto>>
    getVideosByBatch(

            @PathVariable Long batchId
    ) {

        return ResponseEntity.ok(
                videoService.getVideosByBatch(
                        batchId
                )
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<VideoDto>>
    searchVideos(

            @RequestParam String keyword
    ) {

        return ResponseEntity.ok(
                videoService.searchVideos(
                        keyword
                )
        );
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<VideoDto>
    toggleStatus(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                videoService.toggleStatus(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteVideo(
            @PathVariable Long id
    ) {

        videoService.deleteVideo(id);

        return ResponseEntity.ok(
                "Video Deleted"
        );
    }
}
