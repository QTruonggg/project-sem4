package hbs.booking.service.impl;

import hbs.booking.model.entity.DormSlot;
import hbs.booking.repository.DormSlotRepository;
import hbs.booking.service.DormSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DormSlotServiceImpl extends BaseServiceImpl<DormSlot, Long, DormSlotRepository>
        implements DormSlotService {
    private final DormSlotRepository repository;

    @Override
    public Optional<DormSlot> findDormSlotById(Long id) {
        return repository.findById(id);
    }

}
