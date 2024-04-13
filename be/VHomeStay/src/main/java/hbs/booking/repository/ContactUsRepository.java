package hbs.booking.repository;

import hbs.booking.model.entity.ContactUs;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactUsRepository extends BaseRepository<ContactUs, Long> {
    @Query("SELECT c.phone FROM ContactUs c")
    Optional<List<String>> getPhoneOfVillage();
}
