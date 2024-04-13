package hbs.booking.service;

import hbs.booking.model.dto.request.area.AreaAdminRequestDto;
import hbs.booking.model.dto.response.area.AreaAdminResponseDto;
import hbs.booking.model.dto.response.household.customer.HomestayIntroductionDto;
import hbs.booking.model.entity.Area;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface AreaService extends BaseService<Area, Long>{
    boolean addAreaByAdmin(AreaAdminRequestDto area) throws IOException;
    List<AreaAdminResponseDto> getAreasByAdmin();
    Optional<AreaAdminResponseDto> getAreaByAdmin(Long areaId);
    boolean updateAreaByAdmin(AreaAdminRequestDto area);
    boolean deleteAreaByAdmin(Long areaId);
    List<HomestayIntroductionDto> getAreaIntroductionList();
}
