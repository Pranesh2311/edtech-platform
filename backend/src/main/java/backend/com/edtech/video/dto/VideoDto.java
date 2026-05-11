package backend.com.edtech.video.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoDto {

    private Long id;

    private String title;

    private String description;

    private String videoUrl;

    private String thumbnailUrl;

    private Integer duration;

    private Boolean active;

    private Boolean freeVideo;

    private Long batchId;

    private String batchName;
}
