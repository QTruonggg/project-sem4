package hbs.booking.repository;

import hbs.booking.model.entity.CustomerBankInformation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerBankInformationRepository extends BaseRepository<CustomerBankInformation, Long> {
    @Query("SELECT c FROM CustomerBankInformation c JOIN c.customer cu WHERE cu.id = :id")
    Optional<CustomerBankInformation> findByCustomerId(Long id);
}
