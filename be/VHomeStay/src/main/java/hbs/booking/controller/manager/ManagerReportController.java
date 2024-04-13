package hbs.booking.controller.manager;

import hbs.booking.model.dto.response.report.manager.BookingReportDetailForManagerResponse;
import hbs.booking.model.dto.response.report.manager.BookingReportListForManagerResponse;
import hbs.booking.model.dto.response.report.manager.RoomTypeReportDetailForManagerResponse;
import hbs.booking.model.dto.response.report.manager.RoomTypeReportListForManagerResponse;
import hbs.booking.service.ReportService;
import hbs.booking.service.impl.ReportServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/manager/report")
@RequiredArgsConstructor
public class ManagerReportController {

    private final ReportService reportService;

    @GetMapping("/booking")
    BookingReportListForManagerResponse getBookingReportListForManager(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
                                                                       @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate){
        List<BookingReportDetailForManagerResponse> bookingReportDetailForManagerResponses = reportService.getBookingReportListForManager(checkInDate, checkOutDate);
        return BookingReportListForManagerResponse.builder().bookingReportDetailListForManager(bookingReportDetailForManagerResponses).build();
    }

    @GetMapping("/room-type")
    RoomTypeReportListForManagerResponse getRoomTypeReportListForManager(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
                                                                         @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate){
        List<RoomTypeReportDetailForManagerResponse> roomTypeReportListForManager = reportService.getRoomTypeDetailListReport(checkInDate, checkOutDate);
        return RoomTypeReportListForManagerResponse.builder().roomTypeReportListForManager(roomTypeReportListForManager).build();
    }

    @GetMapping("/booking-cancel")
    BookingReportListForManagerResponse getBookingHaveBeenCancelReportListForManager(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
                                                                                     @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate){
        List<BookingReportDetailForManagerResponse> bookingReportDetailForManagerResponses = reportService.getBookingHaveBeenCancelReportListForManager(checkInDate, checkOutDate);
        return BookingReportListForManagerResponse.builder().bookingReportDetailListForManager(bookingReportDetailForManagerResponses).build();
    }

}
