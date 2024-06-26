package hbs.booking.service;

import hbs.booking.model.dto.request.homestay.HomestayAdminRequestDto;
import hbs.booking.model.dto.response.*;
import hbs.booking.model.dto.response.homestay.HomestayForSearchRoomManagerResponseDto;
import hbs.booking.model.dto.response.homestay.admin.HomestayAdminResponseDto;
import hbs.booking.model.dto.response.homestay.admin.HomestayCommonAdminResponseDto;
import hbs.booking.model.dto.response.homestay.admin.HomestayListAdminResponseDto;
import hbs.booking.model.entity.Homestay;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface HomestayService {
    List<HomestayInformationForManager> getAllHomestayDetailForManager(String managerEmail);
    @Transactional
    boolean editHomestay(Long updateFields, HomestayInformationForManager homestayId) throws IOException;
    void addImagesToHomestay(Homestay homestay, List<MultipartFile> images) throws IOException;
    boolean addHomestayInfo(Long id, HomestayCreateFormResponseDto request) throws IOException;
    List<HomestayDto> findHomestayByHouseholdId(Long householdId);
    Optional<Homestay> findById(Long id);
    HomestayInformationForManager mapToDTOForDetail(Homestay homestay);
    Homestay mapToEntity(HomestayInformationForManager homestayInformationForManager);
    boolean deletedHomestay(Long homestayId);
    HomestayInformationForManager getHomestayDetail(Long homestayId);
    boolean hideOrShowHomestay(Long homestayId);
    Optional<Homestay> findHomestayById(Long homestayId);
    List<HomestayForSearchRoomManagerResponseDto> showHomestaysForSearchRooms();
    List<Homestay> getHomestaysByAreaId(Long id);
    List<HomestayListAdminResponseDto> findAllHomestaysByAdmin();
    HomestayAdminResponseDto showHomestayFormByAdmin();
    void addHomestayByAdmin(HomestayAdminRequestDto homestayAdminRequestDto);
    void updateHomestayByAdmin(HomestayAdminRequestDto homestayAdminRequestDto);
    Optional<HomestayCommonAdminResponseDto> findHomestayCommonInformationByAdmin(Long homestayId);
    Optional<Homestay> getHomestayByManagerEmailAndHomestayId(String managerEmail, Long homestayId);
    void deleteHomestayByAdmin(Long homestayId);
}
