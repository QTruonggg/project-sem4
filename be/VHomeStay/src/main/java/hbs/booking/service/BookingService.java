package hbs.booking.service;

import hbs.booking.enums.BookingStatus;
import hbs.booking.model.dto.request.booking.BookingCancelManagerRequestDto;
import hbs.booking.model.dto.request.booking.BookingCreateManagerRequestDto;
import hbs.booking.model.dto.request.booking.BookingEditManagerRequestDto;
import hbs.booking.model.dto.response.BookingSummaryWithDetailsDTO;
import hbs.booking.model.dto.response.BookingResponseDto;
import hbs.booking.model.dto.response.booking.manager.*;
import hbs.booking.model.dto.response.user.BookingOfCustomerDto;
import hbs.booking.model.entity.Booking;
import jakarta.mail.MessagingException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingService extends BaseService<Booking, Long>{
    List<BookingResponseDto> findBookingsByCustomerEmail();
    BookingSummaryWithDetailsDTO findBookingDetails(String bookingCode);
    BookingManagerSummaryWithDetailsDto findBookingDetailsByManager(String bookingCode);
    List<BookingManagerResponseDto> findBookingsByManagerEmail(String searchValue, LocalDate checkInDate, LocalDate checkOutDate);
    Optional<Booking> findBookingByBookingCode(String bookingCode);
    @Transactional
    boolean cancelBookingByManager(BookingCancelManagerRequestDto bookingCancelManagerRequestDto);
    boolean cancelBooking(Booking booking);
    BookingResponseDto mapToCustomerDTO(Booking booking);
    BookingManagerResponseDto mapToManagerDTO(Booking booking);
    Booking mapToCustomerEntity(BookingResponseDto bookingFormDto);
    BookingCancelManagerResponseDto findBookingCancelFormByManager(String bookingCode);
    void updateBookingByManager(BookingEditManagerRequestDto bookingEditManagerRequestDto);
    String findHouseNameByBookingCode(String bookingCode);
    void sendEmailBookingSuccess(String bookingCode) throws MessagingException;
    @Transactional
    void bookingRoomByManager(BookingCreateManagerRequestDto bookingCreateManagerRequestDto);
    void updateBookingStatusByBookingCode(String bookingCode, BookingStatus status);
    boolean checkInBookingByManager(String bookingCode);
    boolean checkOutBookingByManager(String bookingCode);
    List<BookingOfCustomerDto> getBookingOfCustomer(Long accountId);
    List<BookingCheckInOutTodayResponseDto> findBookingsCheckInTodayByManager(LocalDate checkInToday, Long homestayId);
    List<BookingCheckInOutTodayResponseDto> findBookingsCheckOutTodayByManager(LocalDate checkOutToday, Long homestayId);

    List<BookingDetailManagerResponseDto> getBookingDetailCheckInOutByManager(String bookingCode);
    void refundBookingByManager(String bookingCode);
}
