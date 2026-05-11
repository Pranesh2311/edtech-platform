package backend.com.edtech.notification.entity;

import backend.com.edtech.security.entity.User;
import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String message;

    private boolean readStatus;

    private LocalDateTime createdAt;

    private String type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}