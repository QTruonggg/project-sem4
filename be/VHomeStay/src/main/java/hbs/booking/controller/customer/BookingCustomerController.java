package hbs.booking.controller.customer;

import hbs.booking.config.VNPayConfig;
import hbs.booking.model.dto.request.booking.BookingCancelCustomerRequestDto;
import hbs.booking.model.dto.request.booking.BookingCreateCustomerRequestDto;
import hbs.booking.model.dto.request.booking.BookingInfoForUpdateDto;
import hbs.booking.model.dto.response.booking.customer.BookingCancelCustomerResponseDto;
import hbs.booking.model.dto.response.payment.PaymentResponseDto;
import hbs.booking.service.BookingForCustomerService;
import hbs.booking.service.PaymentService;
import hbs.booking.util.exception.ResourceInternalServerErrorException;
import hbs.booking.util.exception.ResourceNotFoundException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/customers/booking")
@RequiredArgsConstructor
public class BookingCustomerController {

    private final BookingForCustomerService bookingForCustomerService;
    private final PaymentService paymentService;

    @PostMapping()
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> bookingRoom(@RequestBody BookingCreateCustomerRequestDto bookingCreateCustomerRequestDto) throws UnsupportedEncodingException, MessagingException {
        //Check available room
        if (!bookingForCustomerService.checkChooseAvailableRoomType(bookingCreateCustomerRequestDto.getBookingDetailList(),
                                                                    bookingCreateCustomerRequestDto.getHouseholdId(),
                                                                    bookingCreateCustomerRequestDto.getCheckInDate(),
                                                                    bookingCreateCustomerRequestDto.getCheckOutDate(),
                                                                    bookingCreateCustomerRequestDto.getNumberOfGuests())) {
            throw new ResourceNotFoundException("booking.not.available");
        }

        //Create booking
        String bookingCode = bookingForCustomerService.bookingRoom(bookingCreateCustomerRequestDto);

        //Create payment request
        String ip = VNPayConfig.getIpAddress();
        PaymentResponseDto paymentResponseDto;
        if (bookingCreateCustomerRequestDto.getPaymentGateway().equals("VN_PAY")) {
            paymentResponseDto = paymentService.createVNPayPayment(bookingCode, bookingCreateCustomerRequestDto.getTotalPrice(), ip);
        } else {
            throw new ResourceNotFoundException("payment.gateway.not.found");
        }

        return ResponseEntity.ok(paymentResponseDto);
    }

    @PatchMapping()
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> updateBooking(@RequestBody BookingInfoForUpdateDto bookingInfoForUpdateDto) {
        bookingForCustomerService.updateBooking(bookingInfoForUpdateDto);

        return ResponseEntity.ok("booking.update.success");

    }

    @GetMapping("/{bookingCode}/cancel-form")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> getBookingCancelForm(@PathVariable String bookingCode) {
        BookingCancelCustomerResponseDto bookingCancelFormByCustomer = bookingForCustomerService.findBookingCancelFormByCustomer(bookingCode);
        Map<String, Object> response = new HashMap<>();
        response.put("bookingCancelForm", bookingCancelFormByCustomer);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> cancelBooking(@RequestBody BookingCancelCustomerRequestDto bookingCancelCustomerRequestDto) {
        bookingForCustomerService.cancelBooking(bookingCancelCustomerRequestDto);

        return ResponseEntity.ok("booking.cancel.success");
    }

}
