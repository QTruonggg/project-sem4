package hbs.booking.service;

import hbs.booking.model.dto.response.FacilityDto;
import hbs.booking.model.dto.response.facility.FacilityAdminResponseDto;
import hbs.booking.model.entity.Facility;

import java.util.List;

public interface FacilityService {
    List<Facility> findAll();

    FacilityDto mapFacilityToDto(Facility facility);

    Facility mapDtoToFacility(FacilityDto facilityDto);

    List<FacilityDto> mapFacilityListToDtoList(List<Facility> facilityList);
    List<Facility> mapDtoListToFacilityList(List<FacilityDto> facilityDtoList);
    List<FacilityAdminResponseDto> findAllActive();
    void updateFacilityByAdmin(FacilityAdminResponseDto facilityAdminResponseDto);
    void createFacilityByAdmin(FacilityAdminResponseDto facilityAdminResponseDto);

    void deleteFacilityByAdmin(Long id);
}
