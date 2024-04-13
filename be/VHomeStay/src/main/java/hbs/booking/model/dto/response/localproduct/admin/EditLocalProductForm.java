package hbs.booking.model.dto.response.localproduct.admin;

import hbs.booking.enums.LocalProductType;
import hbs.booking.model.entity.VillageMedia;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EditLocalProductForm {
    private Long localProductId;
    private String localProductName;
    private LocalProductType localProductType;
    private String localProductDescription;
    private String localProductUnit;
    private BigDecimal localProductMinPrice;
    private BigDecimal localProductMaxPrice;
    private List<VillageMedia> villageMedias;
    private List<String> localProductTypes;
}
