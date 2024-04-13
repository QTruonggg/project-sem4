package hbs.booking.model.dto.response.booking.manager;

import hbs.booking.enums.BookingDetailStatus;
import hbs.booking.enums.BookingStatus;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookingDetailManagerResponseDto {
    private Long id;
    private String bookingCode;
    private String homestayCode;
    private String roomTypeName;
    private String roomName;
    private Integer slotNumber;
    private String checkInCustomerName;
    private BigDecimal price;
    private BookingDetailStatus bookingDetailStatus;
    private BookingStatus bookingStatus;
    private Boolean isDorm;
}
