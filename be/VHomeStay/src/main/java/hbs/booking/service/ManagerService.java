package hbs.booking.service;

import hbs.booking.model.dto.response.UserResponseDto;
import hbs.booking.model.dto.response.dashboard.manager.DashboardForManager;
import hbs.booking.model.dto.response.dashboard.manager.HomestayInformationForDashboard;
import hbs.booking.model.dto.response.user.UserInfoResponseDto;
import hbs.booking.model.entity.Manager;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ManagerService {
    Optional<UserResponseDto> getManagerProfile();
    Optional<UserResponseDto> getManagerByAccountEmail(String email);
    boolean updateManagerProfile(UserResponseDto userResponseDto);
    UserResponseDto mapToDTO(Manager manager);
    Manager mapToEntity(UserResponseDto userResponseDto);
    List<UserInfoResponseDto> findAllByAdmin();
    DashboardForManager getManagerDashboard();
    List<HomestayInformationForDashboard> getHomestayInformationForDashboard();
    void updateManagerAvatar(MultipartFile image) throws IOException;
}
