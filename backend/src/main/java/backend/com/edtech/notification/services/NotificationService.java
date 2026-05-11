package backend.com.edtech.notification.services;

import backend.com.edtech.notification.dto.NotificationRequestDto;
import backend.com.edtech.notification.dto.NotificationResponseDto;

import java.util.List;

public interface NotificationService {

    NotificationResponseDto createNotification(
            NotificationRequestDto dto
    );

    List<NotificationResponseDto>
    getUserNotifications(Long userId);

    long getUnreadCount(Long userId);

    void markAsRead(Long notificationId);
}
