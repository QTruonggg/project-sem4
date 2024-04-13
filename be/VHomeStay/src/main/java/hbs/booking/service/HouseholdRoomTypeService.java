package hbs.booking.service;

import hbs.booking.enums.HouseholdTypeRoomStatus;
import hbs.booking.model.dto.response.HouseholdRoomTypeCreateFormResponseDto;
import hbs.booking.model.dto.response.HouseholdRoomTypeDto;
import hbs.booking.model.dto.response.HouseholdRoomTypeResponseDto;
import hbs.booking.model.entity.Household;
import hbs.booking.model.entity.HouseholdRoomType;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface HouseholdRoomTypeService {
    @Transactional
    boolean addHouseholdRoomType(HouseholdRoomTypeCreateFormResponseDto householdRoomTypeCreateFormResponseDto, Long id) throws IOException;
    Optional<HouseholdRoomType> findByHouseholdIdAndRoomTypeId(Long householdId, Long roomTypeId);
    List<HouseholdRoomTypeDto> findHouseholdRoomTypeByHouseholdId(Long householdId);
    List<HouseholdRoomTypeResponseDto> getAllHouseholdRoomTypeThatManageIsManaged(String managerEmail);
    Optional<HouseholdRoomType> findById(Long id);
    HouseholdRoomTypeResponseDto mapToDTO(HouseholdRoomType householdRoomType);
    HouseholdRoomType mapToEntity(HouseholdRoomTypeResponseDto householdRoomTypeResponseDto);
    HouseholdRoomTypeResponseDto showHouseholdRoomTypeForEdit(Long householdRoomTypeId, Household household);
    boolean createRequestPriceTypeRoom(Long householdId, Long householdRoomTypeId, BigDecimal price, HouseholdTypeRoomStatus status);
    @Transactional
    boolean editHouseholdRoomType(Long id, HouseholdRoomTypeResponseDto householdRoomTypeResponseDto) throws IOException;
    boolean deleteHouseholdRoomType(Long id);
    Optional<HouseholdRoomType> getByManagerEmailAndId(String s, Long id);
    List<HouseholdRoomTypeDto> findHouseholdDormByHouseholdId(Long householdId);
}
