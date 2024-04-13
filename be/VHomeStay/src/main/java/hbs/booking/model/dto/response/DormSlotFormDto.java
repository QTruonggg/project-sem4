package hbs.booking.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DormSlotFormDto {
    private Long roomId;
    private Integer numberOfSlots;
}
