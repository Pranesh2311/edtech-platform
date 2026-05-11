package backend.com.edtech.notification.dto;

import lombok.Data;

@Data
public class NotificationRequestDto {

    private String title;

    private String message;

    private String type;

    private Long userId;
}
