package hbs.booking.repository;

import hbs.booking.enums.MediaVillagePosition;
import hbs.booking.model.entity.VillageMedia;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VillageMediaRepository extends BaseRepository<VillageMedia, Long>{
    @Query("SELECT v.filePath FROM VillageMedia v " +
            "WHERE v.position IN (hbs.booking.enums.MediaVillagePosition.HOME_MAIN, hbs.booking.enums.MediaVillagePosition.HOME_SUB, hbs.booking.enums.MediaVillagePosition.GALLERY) " +
            "ORDER BY v.position ASC")
    List<String> getAllUrlVillageMedia();

    @Query("SELECT v FROM VillageMedia v WHERE v.position = :position")
    List<VillageMedia> findByVillageMediaByPosition(MediaVillagePosition position);

    @Query("SELECT v.filePath FROM VillageMedia v " +
            "WHERE v.position = hbs.booking.enums.MediaVillagePosition.HOME_MAIN OR v.position = hbs.booking.enums.MediaVillagePosition.HOME_SUB " +
            "ORDER BY v.position ASC")
    List<String> getVillageMediaHomePage();
    List<VillageMedia> findAllByLocalProductId(Long localProductId);
    @Query("SELECT v FROM VillageMedia v WHERE v.villageInformation.id = :id")
    List<VillageMedia> findAllByVillageInformationId(Long id);
}
