package hbs.booking.service.impl;

import hbs.booking.enums.RefundStatus;
import hbs.booking.model.entity.CancellationHistory;
import hbs.booking.repository.CancellationHistoryRepository;
import hbs.booking.security.SecurityUtil;
import hbs.booking.service.CancellationHistoryService;
import hbs.booking.util.exception.ResourceInternalServerErrorException;
import hbs.booking.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CancellationHistoryServiceImpl
        extends BaseServiceImpl<CancellationHistory, Long, CancellationHistoryRepository>
        implements CancellationHistoryService {
    private final CancellationHistoryRepository cancellationHistoryRepository;

    @Override
    public boolean saveCancellationHistory(CancellationHistory cancellationHistory) {
        try {
            cancellationHistoryRepository.save(cancellationHistory);
            return true;
        } catch (Exception e) {
            throw new ResourceInternalServerErrorException("internal.server.error");
        }
    }

    @Override
    public boolean refundBookingByManager(String bookingCode) {
            String managerEmail = SecurityUtil.getCurrentUserLogin().get();

            Optional<CancellationHistory> cancellationHistoryOptional = cancellationHistoryRepository.findCancellationHistoryByBookingCodeAndManagerEmail(bookingCode, managerEmail);

            if(!cancellationHistoryOptional.isPresent()){
                throw new ResourceNotFoundException("booking.not.found");
            }

            CancellationHistory cancellationHistory = cancellationHistoryOptional.get();
            cancellationHistory.setRefundStatus(RefundStatus.REFUNDED);

        try {
            cancellationHistoryRepository.save(cancellationHistory);

            return true;
        }catch (Exception e){
            throw new ResourceInternalServerErrorException("internal.server.error");
        }
    }
}
