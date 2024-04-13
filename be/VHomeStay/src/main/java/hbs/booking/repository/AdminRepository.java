package hbs.booking.repository;

import hbs.booking.model.dto.response.user.UserInfoResponseDto;
import hbs.booking.model.entity.Admin;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends BaseRepository<Admin, Long> {
    @Query("SELECT ad FROM Admin ad JOIN ad.account a WHERE a.email = :email AND a.status = 'ACTIVE'")
    Optional<Admin> findByAccountEmail(String email);

    @Query("SELECT new hbs.booking.model.dto.response.user.UserInfoResponseDto(a.id, m.avatar, a.email, m.firstName, m.lastName, a.role, a.createdDate, '', a.status) " +
            "FROM Admin m JOIN m.account a WHERE a.status != 'DELETED'")
    List<UserInfoResponseDto> findAllByAdmin();

    @Query("SELECT m FROM Admin m JOIN m.account a WHERE a.email = :email")
    Optional<Admin> findByEmail(String email);

}
