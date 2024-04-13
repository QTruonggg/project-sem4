package hbs.booking.service;

import hbs.booking.model.entity.CustomerBankInformation;

public interface CustomerBankInformationService {
    void saveCustomerBankInformation(CustomerBankInformation customerBankInformation);
    CustomerBankInformation findByCustomerId(Long id);
}
