package hbs.booking.service;

import hbs.booking.model.dto.request.NotificationBookingCancelRequest;
import hbs.booking.model.dto.request.NotificationBookingSuccessRequest;
import hbs.booking.model.dto.request.NotificationRequestPriceRequest;

public interface NotificationService {
    void pushBookingSuccessNotification(Long toWhom, NotificationBookingSuccessRequest notificationRequest);

    void pushBookingCancelNotification(Long toWhom, NotificationBookingCancelRequest bookingCancelRequest);

    void pushRequestResultNotification(Long toWhom, NotificationRequestPriceRequest notificationRequest);
    void sendOnlineNotification(Long userId);
    void readNotification(Long notificationId);
}
