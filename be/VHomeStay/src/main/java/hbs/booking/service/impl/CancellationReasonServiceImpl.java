package hbs.booking.service.impl;

import hbs.booking.model.entity.CancellationReason;
import hbs.booking.repository.CancellationReasonRepository;
import hbs.booking.service.CancellationReasonService;
import org.springframework.stereotype.Service;

@Service
public class CancellationReasonServiceImpl
        extends BaseServiceImpl<CancellationReason, Long, CancellationReasonRepository>
        implements CancellationReasonService {

}
