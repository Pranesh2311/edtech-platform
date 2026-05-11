package backend.com.edtech.video.repository;

import backend.com.edtech.video.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findByBatchId(Long batchId);

    List<Video>
    findByTitleContainingIgnoreCase(
            String keyword
    );

    List<Video> findByActiveTrue();
}
