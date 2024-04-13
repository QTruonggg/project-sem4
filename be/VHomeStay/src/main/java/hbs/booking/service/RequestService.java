package hbs.booking.service;

import hbs.booking.model.dto.request.request.RequestUpdateStatusDto;
import hbs.booking.model.dto.response.request.RequestDetailResponseDto;
import hbs.booking.model.dto.response.request.RequestForManagerDto;
import hbs.booking.model.dto.response.request.RequestResponseDto;
import hbs.booking.model.dto.response.request.RoomTypeHouseholdUpdatePriceDto;
import hbs.booking.model.entity.Request;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RequestService extends BaseService<Request, Long> {

    List<RequestResponseDto> getRequestByAdmin();

    RequestDetailResponseDto getRequestDetailByAdmin(Long requestId);

    RoomTypeHouseholdUpdatePriceDto getRoomTypeHouseholdUpdatePriceDto(Long requestId);

    @Transactional
    void updateRequestByAdmin(RequestUpdateStatusDto requestUpdateStatusDto);

    List<RequestForManagerDto> getRequestByManager();

    @Transactional
    void deleteRequestByManager(Long requestId);
}
