package hbs.booking.model.dto.response;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingListResponseDto {
    List<BookingResponseDto> bookingResponseDtos;
}
