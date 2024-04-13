package hbs.booking.service.impl;

import hbs.booking.enums.BaseStatus;
import hbs.booking.model.dto.response.FacilityDto;
import hbs.booking.model.dto.response.RoomTypeDto;
import hbs.booking.model.dto.response.facility.FacilityAdminResponseDto;
import hbs.booking.model.entity.Facility;
import hbs.booking.model.entity.RoomType;
import hbs.booking.repository.FacilityRepository;
import hbs.booking.repository.RoomTypeRepository;
import hbs.booking.service.FacilityService;
import hbs.booking.util.exception.ResourceInternalServerErrorException;
import hbs.booking.util.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FacilityServiceImpl extends BaseServiceImpl<Facility, Long, FacilityRepository>
        implements FacilityService {

    private final FacilityRepository facilityRepository;
    private final ModelMapper modelMapper;

    public FacilityServiceImpl(FacilityRepository facilityRepository, ModelMapper modelMapper) {
        this.facilityRepository = facilityRepository;
        this.modelMapper = modelMapper;
        modelMapperConfiguration();
    }

    private void modelMapperConfiguration() {
        modelMapper.createTypeMap(Facility.class, FacilityDto.class)
                .addMapping(Facility::getId, FacilityDto::setId)
                .addMapping(Facility::getFacilityName, FacilityDto::setFacilityName);
    }

    @Override
    public List<Facility> findAll() {
        return facilityRepository.findAll();
    }

    @Override
    public FacilityDto mapFacilityToDto(Facility facility) {
        return modelMapper.map(facility, FacilityDto.class);
    }

    @Override
    public Facility mapDtoToFacility(FacilityDto facilityDto) {
        return modelMapper.map(facilityDto, Facility.class);
    }

    @Override
    public List<FacilityDto> mapFacilityListToDtoList(List<Facility> facilityList) {
        return facilityList.stream()
                .map(this::mapFacilityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<Facility> mapDtoListToFacilityList(List<FacilityDto> facilityDtoList) {
        return facilityDtoList.stream()
                .map(this::mapDtoToFacility)
                .collect(Collectors.toList());
    }

    @Override
    public List<FacilityAdminResponseDto> findAllActive() {
        List<Facility> facilities = facilityRepository.findAllActive();

        List<FacilityAdminResponseDto> facilityAdminResponseDtos = new ArrayList<>();
        FacilityAdminResponseDto facilityAdminResponseDto;

        for (Facility facility : facilities) {
            facilityAdminResponseDto = new FacilityAdminResponseDto();
            facilityAdminResponseDto.setId(facility.getId());
            facilityAdminResponseDto.setFacilityName(facility.getFacilityName());
            facilityAdminResponseDto.setStatus(facility.getStatus());

            facilityAdminResponseDtos.add(facilityAdminResponseDto);
        }
        return facilityAdminResponseDtos;
    }

    @Override
    public void updateFacilityByAdmin(FacilityAdminResponseDto facilityAdminResponseDto) {
        Facility facility = facilityRepository.findByIdActive(facilityAdminResponseDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("facility.not.found"));

        facility.setFacilityName(facilityAdminResponseDto.getFacilityName());
        try {
            facilityRepository.save(facility);
        } catch (Exception e) {
            throw new ResourceInternalServerErrorException("facility.update.failed");
        }

    }

    @Override
    public void createFacilityByAdmin(FacilityAdminResponseDto facilityAdminResponseDto) {
        Facility facility = new Facility();
        facility.setFacilityName(facilityAdminResponseDto.getFacilityName());
        facility.setStatus(BaseStatus.ACTIVE);

        try {
            facilityRepository.save(facility);
        } catch (Exception e) {
            throw new ResourceInternalServerErrorException("facility.add.success");
        }
    }

    @Override
    public void deleteFacilityByAdmin(Long id) {
        Facility facility = facilityRepository.findByIdActive(id)
                .orElseThrow(() -> new ResourceNotFoundException("facility.not.found"));

        facility.setStatus(BaseStatus.DELETED);

        try {
            facilityRepository.save(facility);
        } catch (Exception e) {
            throw new ResourceInternalServerErrorException("facility.delete.failed");
        }
    }
}
