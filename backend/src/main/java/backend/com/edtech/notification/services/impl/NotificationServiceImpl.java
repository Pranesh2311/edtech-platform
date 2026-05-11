package backend.com.edtech.notification.services.impl;

import backend.com.edtech.notification.dto.NotificationRequestDto;
import backend.com.edtech.notification.dto.NotificationResponseDto;
import backend.com.edtech.notification.entity.Notification;
import backend.com.edtech.notification.repository.NotificationRepository;
import backend.com.edtech.notification.services.NotificationService;
import backend.com.edtech.security.entity.User;
import backend.com.edtech.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository
            notificationRepository;

    private final UserRepository userRepository;

    @Override
    public NotificationResponseDto
    createNotification(
            NotificationRequestDto dto
    ) {

        User user =
                userRepository.findById(
                        dto.getUserId()
                ).orElseThrow(
                        () -> new RuntimeException(
                                "User Not Found"
                        )
                );

        Notification notification =
                Notification.builder()
                        .title(dto.getTitle())
                        .message(dto.getMessage())
                        .type(dto.getType())
                        .readStatus(false)
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .user(user)
                        .build();

        notificationRepository.save(notification);

        return mapToDto(notification);
    }

    @Override
    public List<NotificationResponseDto>
    getUserNotifications(Long userId) {

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(
                        userId
                )
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public long getUnreadCount(Long userId) {

        return notificationRepository
                .countByUserIdAndReadStatusFalse(
                        userId
                );
    }

    @Override
    public void markAsRead(Long id) {

        Notification notification =
                notificationRepository
                        .findById(id)
                        .orElseThrow();

        notification.setReadStatus(true);

        notificationRepository.save(
                notification
        );
    }

    private NotificationResponseDto
    mapToDto(Notification n) {

        return NotificationResponseDto
                .builder()
                .id(n.getId())
                .title(n.getTitle())
                .message(n.getMessage())
                .type(n.getType())
                .readStatus(
                        n.isReadStatus()
                )
                .createdAt(
                        n.getCreatedAt()
                )
                .build();
    }
}
