package backend.com.edtech.studyMaterial.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyMaterialDto {

    private Long id;

    private String title;

    private String description;

    private String materialType;

    private String fileUrl;

    private String videoUrl;

    private Long batchId;

    private String batchName;
}
