package hbs.booking.model.dto.response.service.manager;

import hbs.booking.model.dto.response.service.customer.ServiceResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ServiceDetailListResponse {
    List<ServiceDetailResponse> serviceDetailList;
    List<ServiceDetailForAddResponse> serviceListForAdd;
}
