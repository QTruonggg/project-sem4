package hbs.booking.repository;

import hbs.booking.model.dto.response.user.UserInfoResponseDto;
import hbs.booking.model.dto.response.manager.ManagerDetailResponse;
import hbs.booking.model.entity.Manager;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ManagerRepository extends BaseRepository<Manager, Long> {
    @Query("SELECT m " +
            "FROM Manager m JOIN m.account a WHERE a.email = :email AND a.status = 'ACTIVE'")
    Optional<Manager> findByAccountEmail(String email);

    @Query("SELECT new hbs.booking.model.dto.response.user.UserInfoResponseDto(a.id, m.avatar, a.email, m.firstName, m.lastName, a.role, a.createdDate, h.householdName, a.status) " +
            "FROM Manager m JOIN m.account a JOIN m.household h WHERE a.status != 'DELETED'")
    List<UserInfoResponseDto> findAllByAdmin();

    Optional<Manager> findById(Long id);

    @Query("select new hbs.booking.model.dto.response.manager.ManagerDetailResponse(m.id, m.firstName, m.lastName) from Manager m")
    List<ManagerDetailResponse> getAllManager();
}
