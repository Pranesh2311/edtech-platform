package backend.com.edtech.subscription.services;

public interface SubscriptionService {

    boolean hasAccess(

            Long studentId,

            Long batchId
    );
}
