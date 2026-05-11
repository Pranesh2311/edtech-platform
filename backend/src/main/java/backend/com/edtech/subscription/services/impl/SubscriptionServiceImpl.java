package backend.com.edtech.subscription.services.impl;

import backend.com.edtech.subscription.entity.Subscription;
import backend.com.edtech.subscription.repository.SubscriptionRepository;
import backend.com.edtech.subscription.services.SubscriptionService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    @Override
    public boolean hasAccess(

            Long studentId,

            Long batchId
    ) {

        Subscription subscription =
                subscriptionRepository
                        .findByStudentIdAndBatchIdAndActiveTrue(

                                studentId,

                                batchId
                        )
                        .orElse(null);

        if(subscription == null) {

            return false;
        }

        return subscription
                .getExpiryDate()
                .isAfter(
                        LocalDate.now()
                );
    }
}
