package hbs.booking.service;

import hbs.booking.model.dto.response.RoomTypeDto;
import hbs.booking.model.entity.RoomType;

import java.util.List;
import java.util.Optional;

public interface RoomTypeService {
    List<RoomType> findAll();

    RoomTypeDto mapRoomTypeToDto(RoomType roomType);

    RoomType mapDtoToRoomType(RoomTypeDto roomTypeDto);

    List<RoomTypeDto> mapRoomTypeListToDtoList(List<RoomType> roomTypeList);

    List<RoomType> findRoomTypeNotInHouseholdRoomType(Long householdId);
    void addRoomTypeByAdmin(RoomTypeDto roomTypeDto);
    List<RoomTypeDto> getAllRoomTypesByAdmin();
    void updateRoomTypeByAdmin(RoomTypeDto roomTypeDto);
    Optional<RoomTypeDto> getRoomTypeById(Long id);
}
