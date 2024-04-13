package hbs.booking.repository;

import hbs.booking.model.dto.response.booking.customer.HouseholdServiceDto;
import hbs.booking.model.entity.HouseholdService;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HouseholdServiceRepository extends BaseRepository<HouseholdService, Long>{
    @Query("SELECT new hbs.booking.model.dto.response.booking.customer.HouseholdServiceDto(" +
            "hs.id, s.id, s.image, s.serviceName, hs.serviceDescription) " +
            "FROM HouseholdService hs join hs.service s join hs.household h where h.id = :id and hs.status = 'ACTIVE'")
    List<HouseholdServiceDto> getAllHouseholdServiceByHouseholdId(Long id);
}
