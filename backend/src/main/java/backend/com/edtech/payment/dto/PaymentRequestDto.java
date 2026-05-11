package backend.com.edtech.payment.dto;

import lombok.Data;

@Data
public class PaymentRequestDto {

    private Long studentId;

    private Long batchId;

    private Double amount;
}
