package backend.com.edtech.doubt.entity;

import backend.com.edtech.security.entity.User;
import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "doubt_replies")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoubtReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 5000)
    private String reply;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "doubt_id")
    private Doubt doubt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
