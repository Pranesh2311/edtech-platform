package backend.com.edtech.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponseDto {

    private Long id;

    private String title;

    private String message;

    private boolean readStatus;

    private String type;

    private String actionUrl;

    private LocalDateTime createdAt;
}
