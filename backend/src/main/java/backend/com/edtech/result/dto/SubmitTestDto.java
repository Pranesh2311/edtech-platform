package backend.com.edtech.result.dto;

import lombok.Data;

import java.util.Map;

@Data
public class SubmitTestDto {

    private Long examId;

    private String studentName;

    private String studentEmail;

    private Map<Long, String> answers;
}
