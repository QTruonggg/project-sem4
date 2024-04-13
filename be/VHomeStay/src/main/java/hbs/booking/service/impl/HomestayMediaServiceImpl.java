package hbs.booking.service.impl;

import hbs.booking.model.dto.response.HomestayMediaDto;
import hbs.booking.model.entity.HomestayMedia;
import hbs.booking.repository.HomestayMediaRepository;
import hbs.booking.service.HomestayMediaService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HomestayMediaServiceImpl extends BaseServiceImpl<HomestayMedia, Long, HomestayMediaRepository> implements HomestayMediaService {

    private final HomestayMediaRepository homestayMediaRepository;
    private final ModelMapper modelMapper;

    public HomestayMediaServiceImpl(HomestayMediaRepository homestayMediaRepository, ModelMapper modelMapper) {
        this.homestayMediaRepository = homestayMediaRepository;
        this.modelMapper = modelMapper;
        modelMapperConfiguration();
    }

    private void modelMapperConfiguration() {
        modelMapper.createTypeMap(HomestayMedia.class, HomestayMediaDto.class)
                .addMapping(HomestayMedia::getId, HomestayMediaDto::setId)
                .addMapping(HomestayMedia::getFilePath, HomestayMediaDto::setFilePath);
    }


    @Override
    public HomestayMediaDto mapHomestayMediaToDto(HomestayMedia homestayMedia) {
        return modelMapper.map(homestayMedia, HomestayMediaDto.class);
    }

    @Override
    public HomestayMedia mapDtoToHomestayMedia(HomestayMediaDto homestayMediaDto) {
        return modelMapper.map(homestayMediaDto, HomestayMedia.class);
    }

    @Override
    public List<HomestayMediaDto> mapHomestayMediaListToDtoList(List<HomestayMedia> homestayMediaList) {
        return homestayMediaList.stream()
                .map(this::mapHomestayMediaToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<HomestayMedia> mapDtoListToHomestayMediaList(List<HomestayMediaDto> homestayMediaDtoList) {
        return homestayMediaDtoList.stream()
                .map(this::mapDtoToHomestayMedia)
                .collect(Collectors.toList());
    }
}
