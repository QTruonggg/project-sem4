package hbs.booking.service;

import hbs.booking.enums.LocalProductPosition;
import hbs.booking.model.dto.request.localproduct.LocalProductDetailForEditRequest;
import hbs.booking.model.dto.response.localproduct.admin.*;
import hbs.booking.model.dto.response.localproduct.customer.LocalProductDetailForCustomerResponse;
import hbs.booking.model.entity.LocalProduct;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LocalProductService extends BaseService<LocalProduct, Long>{
    List<LocalProductDetailForCustomerResponse> findAllLocalProductForCustomer();
    LocalProductDetailForCustomerResponse findLocalProductByIdForCustomer(Long localProductId);
    List<LocalProductDetailForAdminResponse> findAllLocalProductForAdmin();
    LocalProductDetailForAdminResponse findLocalProductByIdForAdmin(Long localProductId);
    List<LocalProductTop5DetailForAdmin> getTop5LocalProduct();
    AddLocalProductResponse findAllLocalProductHaveNoPosition();
    List<String> showAddLocalProductForm();
    boolean addLocalProduct(LocalProductDetailForEditRequest localProductDetailForAddRequest) throws IOException;
    EditLocalProductForm showEditLocalProductForm(Long localProductId);
    @Transactional
    boolean editLocalProduct(LocalProductDetailForEditRequest localProductDetailForEditRequest) throws IOException;
    void addImagesToVillageMedia(LocalProduct localProduct, MultipartFile[] images) throws IOException;
    boolean setLocalProductPosition(Long localProductId, LocalProductPosition localProductPosition);
    boolean deleteLocalProductPosition(Long localProductId, LocalProductPosition localProductPosition);
    boolean activateLocalProduct(Long localProductId);
    boolean inactivateLocalProduct(Long localProductId);
    boolean deleteLocalProduct(Long localProductId);
    List<LocalProduct> getLocalProductTOP5InHomePage();
}
