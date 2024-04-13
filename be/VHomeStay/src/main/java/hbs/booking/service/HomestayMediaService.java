package hbs.booking.service;

import hbs.booking.model.dto.response.FacilityDto;
import hbs.booking.model.dto.response.HomestayMediaDto;
import hbs.booking.model.entity.Facility;
import hbs.booking.model.entity.HomestayMedia;

import java.util.List;

public interface HomestayMediaService {
    HomestayMediaDto mapHomestayMediaToDto(HomestayMedia homestayMedia);

    HomestayMedia mapDtoToHomestayMedia(HomestayMediaDto homestayMediaDto);

    List<HomestayMediaDto> mapHomestayMediaListToDtoList(List<HomestayMedia> homestayMediaList);

    List<HomestayMedia> mapDtoListToHomestayMediaList(List<HomestayMediaDto> homestayMediaDtoList);

}
