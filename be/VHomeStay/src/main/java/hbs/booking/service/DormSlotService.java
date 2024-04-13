package hbs.booking.service;

import hbs.booking.model.entity.DormSlot;

import java.util.Optional;

public interface DormSlotService extends BaseService<DormSlot, Long>{
    Optional<DormSlot> findDormSlotById(Long id);
}
