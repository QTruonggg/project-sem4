package hbs.booking.service;

import hbs.booking.enums.BookingDetailStatus;
import hbs.booking.model.dto.response.BookingDetailResponseDto;
import hbs.booking.model.entity.BookingDetail;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookingDetailService extends BaseService<BookingDetail, Long>{
    List<BookingDetail> findBookingDetailByBookingCode(String bookingCode);
    @Transactional
    boolean cancelBookingDetail(List<BookingDetail> bookingDetails);
    BookingDetailResponseDto mapToDTO(BookingDetail bookingDetail);
    BookingDetail mapToEntity(BookingDetailResponseDto bookingDetailFormDto);
    void updateBookingDetailStatusByBookingCode(String bookingCode, BookingDetailStatus status);
    void checkInBookingDetailsById(String bookingCode, List<Long> bookingDetailIds);
    void checkOutBookingDetailsById(String bookingCode, List<Long> bookingDetailIds);
}
