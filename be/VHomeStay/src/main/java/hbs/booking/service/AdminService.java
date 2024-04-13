package hbs.booking.service;

import hbs.booking.model.dto.response.UserResponseDto;
import hbs.booking.model.dto.response.dashboard.admin.DashboardForAdmin;
import hbs.booking.model.dto.response.user.UserInfoResponseDto;
import hbs.booking.model.entity.Admin;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    Optional<UserResponseDto> getAdminProfile();
    Optional<UserResponseDto> getAdminByAccountEmail(String email);
    boolean updateAdminProfile(UserResponseDto userResponseDto);
    UserResponseDto mapToDTO(Admin admin);
    Admin mapToEntity(UserResponseDto userResponseDto);
    List<UserInfoResponseDto> findAllByAdmin();
    DashboardForAdmin getAdminDashboard();
    List<Integer> getTotalGuestByMonth(int year);
    void updateAdminAvatar(MultipartFile image);
}
