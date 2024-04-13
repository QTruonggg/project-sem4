package hbs.booking.model.dto.request.localproduct;

import hbs.booking.enums.LocalProductPosition;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocalProductPositionRequest {
    private Long localProductId;
    private LocalProductPosition localProductPosition;
}
