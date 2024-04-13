package hbs.booking.model.dto.response;

import hbs.booking.model.entity.ContactUs;
import hbs.booking.model.entity.VillageInformation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactUsResponseDto {
    private VillageInformation villageInformation;
    private List<ContactUs> contactUs;
}
