package hbs.booking.repository;

import hbs.booking.model.entity.CancellationReason;
import org.springframework.stereotype.Repository;

@Repository
public interface CancellationReasonRepository extends BaseRepository<CancellationReason, Long>{
}
