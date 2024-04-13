package hbs.booking.model.dto.request.booking;

import hbs.booking.enums.RefundStatus;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;

@Data
@ToString
public class BookingCancelManagerRequestDto {
    private String bookingCode;
    private BigDecimal refundAmount;
    private String cancelReason;
    private RefundStatus refundStatus;
}
