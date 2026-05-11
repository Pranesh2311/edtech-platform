package backend.com.edtech.subscription.repository;

import backend.com.edtech.subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository
        extends JpaRepository<
        Subscription,
        Long
        > {

    Optional<Subscription>
    findByStudentIdAndBatchIdAndActiveTrue(

            Long studentId,

            Long batchId
    );
}
