package hbs.booking.model.dto.response.user;

import hbs.booking.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class BookingOfCustomerDto {
    private String bookingCode;
    private String householdAvatar;
    private String householdName;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer numberOfGuest;
    private Integer numberOfNight;
    private BigDecimal totalAmount;
    private BookingStatus bookingStatus;
}
