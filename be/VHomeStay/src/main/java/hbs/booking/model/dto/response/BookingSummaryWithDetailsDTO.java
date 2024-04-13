package hbs.booking.model.dto.response;

import hbs.booking.model.dto.response.booking.manager.BookingSummaryDto;
import lombok.Data;

import java.util.List;

@Data
public class BookingSummaryWithDetailsDTO {
    private BookingResponseDto booking;
    private List<BookingSummaryDto> bookingSummary;
    private List<BookingDetailResponseDto> bookingDetails;
}
