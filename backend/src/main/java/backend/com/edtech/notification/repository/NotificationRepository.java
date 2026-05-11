package backend.com.edtech.notification.repository;

import backend.com.edtech.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification>
    findByUserIdOrderByCreatedAtDesc(
            Long userId
    );

    long countByUserIdAndReadStatusFalse(
            Long userId
    );
}