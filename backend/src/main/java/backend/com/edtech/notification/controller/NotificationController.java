package backend.com.edtech.notification.controller;

import backend.com.edtech.notification.dto.NotificationRequestDto;
import backend.com.edtech.notification.dto.NotificationResponseDto;
import backend.com.edtech.notification.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService
            notificationService;

    @PostMapping
    public NotificationResponseDto
    createNotification(
            @RequestBody
            NotificationRequestDto dto
    ) {

        return notificationService
                .createNotification(dto);
    }

    @GetMapping("/user/{userId}")
    public List<NotificationResponseDto>
    getUserNotifications(
            @PathVariable Long userId
    ) {

        return notificationService
                .getUserNotifications(userId);
    }

    @GetMapping("/unread/{userId}")
    public long getUnreadCount(
            @PathVariable Long userId
    ) {

        return notificationService
                .getUnreadCount(userId);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(
            @PathVariable Long id
    ) {

        notificationService.markAsRead(id);
    }
}
