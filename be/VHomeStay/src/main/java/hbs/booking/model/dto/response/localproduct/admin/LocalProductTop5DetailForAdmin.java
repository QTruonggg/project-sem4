package hbs.booking.model.dto.response.localproduct.admin;

import hbs.booking.enums.LocalProductPosition;
import hbs.booking.enums.LocalProductType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LocalProductTop5DetailForAdmin {
    private LocalProductPosition localProductPosition;
    private Long localProductId;
    private String localProductName;
    private LocalProductType type;

    public LocalProductTop5DetailForAdmin(LocalProductPosition localProductPosition, Long localProductId, String localProductName, LocalProductType type) {
        this.localProductPosition = localProductPosition;
        this.localProductId = localProductId;
        this.localProductName = localProductName;
        this.type = type;
    }
}
