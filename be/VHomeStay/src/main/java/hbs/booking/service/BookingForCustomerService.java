package hbs.booking.service;

import com.google.type.Decimal;
import hbs.booking.enums.BookingStatus;
import hbs.booking.model.dto.request.booking.BookingCancelCustomerRequestDto;
import hbs.booking.model.dto.request.booking.BookingCreateCustomerRequestDto;
import hbs.booking.model.dto.request.booking.BookingDetailCreateCustomerRequestDto;
import hbs.booking.model.dto.request.booking.BookingInfoForUpdateDto;
import hbs.booking.model.dto.response.booking.customer.BookingCancelCustomerResponseDto;
import hbs.booking.model.dto.response.booking.customer.HouseholdDto;
import hbs.booking.model.dto.response.booking.customer.HouseholdForBookingResponseDto;
import hbs.booking.model.dto.response.service.customer.ServiceResponse;
import jakarta.mail.MessagingException;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface BookingForCustomerService {
    List<HouseholdDto> findAllHousehold();
    HouseholdForBookingResponseDto searchHousehold(Long householdId, LocalDate checkInDate, LocalDate checkOutDate, Integer numberOfGuests);
    List<HouseholdForBookingResponseDto> searchHouseholdList(LocalDate checkInDate, LocalDate checkOutDate, Integer numberOfGuests);
    List<ServiceResponse> findAllService();
    boolean checkChooseAvailableRoomType(List<BookingDetailCreateCustomerRequestDto> bookingDetailList,
                                         Long householdId, LocalDate checkInDate, LocalDate checkOutDate, Integer numberOfGuest);
    @Transactional
    String bookingRoom(BookingCreateCustomerRequestDto bookingCreateCustomerRequestDto) throws MessagingException;
    void updateBooking(BookingInfoForUpdateDto bookingInfoForUpdateDto);
    BookingCancelCustomerResponseDto findBookingCancelFormByCustomer(String bookingCode);
    @Transactional
    void cancelBooking(BookingCancelCustomerRequestDto bookingCancelCustomerRequestDto);
    String findHouseNameByBookingCode(String bookingCode);
    void sendEmailBookingSuccess(String bookingCode) throws MessagingException;
    void updateBookingStatusByBookingCode(String bookingCode, BookingStatus status);
    String generateBookingCode(Long cusId, Long householdId);

    BigDecimal findMaxPrice(List<HouseholdForBookingResponseDto> householdListResponseDto, long nights);
}
