package hbs.booking.service;

import hbs.booking.model.entity.CancellationHistory;

public interface CancellationHistoryService extends BaseService<CancellationHistory, Long>{
    boolean saveCancellationHistory(CancellationHistory cancellationHistory);
    boolean refundBookingByManager(String bookingCode);
}
