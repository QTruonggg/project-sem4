package hbs.booking.model.dto.request.villageInformation;

import hbs.booking.enums.VillageInformationType;
import hbs.booking.model.entity.VillageMedia;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InformationAdminRequestDto {
    private Long id;
    private String title;
    private String description;
    private Long totalVisitedCustomer;
    private Long totalVisitor;
    private VillageInformationType type;
    private List<VillageMedia> oldImages;
    private List<MultipartFile> newImages;
}
