package hbs.booking.repository;

import hbs.booking.enums.Provider;
import hbs.booking.model.entity.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends BaseRepository<Account, Long> {
    Optional<Account> findByEmailIgnoreCase(String account);
    @Query("SELECT a FROM Account a join a.manager m WHERE m.phoneNumber = :phoneNumber AND a.status = 'ACTIVE'")
    Optional<Account> findByPhoneNumber(String phoneNumber);

    @Query("SELECT a FROM Account a WHERE a.email = :email AND a.status = 'ACTIVE'")
    Optional<Account> findByEmail(String email);

    Optional<Account> findByOtp(String otp);

    @Query("SELECT a FROM Account a WHERE a.email = :email AND a.provider = :provider AND a.providerId = :providerId")
    Optional<Account> findByEmailAndProviderAndProviderId(@Param("email") String email,
                                                          @Param("provider") Provider provider,
                                                          @Param("providerId") String providerId);
    @Query("SELECT a FROM Account a WHERE a.email = :email")
    Optional<Account> findAccountByEmail(String email);
}
