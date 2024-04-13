package hbs.booking.model.dto.response.booking.customer;

import hbs.booking.model.entity.CancellationReason;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
@Data
public class BookingCancelCustomerResponseDto {
    private String bookingCode;
    private BigDecimal refundAmount;
    private List<CancellationReason> cancellationReasons;
    private String status;

}
