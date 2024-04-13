export interface IAdminReport {
    reportDetailListForAdmin : IAdminReportDetail[];
}

export interface IAdminReportDetail {
    householdId: number;
    householdName: string;
    managerName: string;
    homeStayName: string[];
    totalHomestay: number;
    totalCapacity: number;
    totalCustomer: number;
    totalCustomerByDay: number;
    totalRevenue: number;
}

export interface IManagerBookingReport {
    bookingReportDetailListForManager: IManagerBookingReportDetail[];
}

export interface IManagerBookingReportDetail {
    bookingCode: string;
    checkInDate: string;
    customerName: string;
    totalCustomer: number;
    bookedNight: number;
    totalRevenue: number;
    paymentDate?: string;
    paymentMethod: string;
    gateway?: string;
    note?: string;
    refundAmount?: number;
    cancellationDate?: string;
    refundDate?: string;
    bookingStatus?: string;
    refundMethod: string;
}

export interface IManagerRoomTypeReport {
    roomTypeReportListForManager: IManagerRoomTypeReportDetail[];
}

export interface IManagerRoomTypeReportDetail {
    homestayCode: string;
    roomTypeName: string;
    totalRoom: number;
    totalDormSlot: number;
    totalCustomer: number;
    totalCustomerByDay: number;
    totalRevenue: number;
}

export interface IHouseholdRevenueReport {
    list: IHouseholdRevenueReportDetail[];
}
export interface IHouseholdRevenueReportDetail {
    householdName: string;
    managerName: string;
    managerEmail: string;
    managerPhone: string;
    totalRevenue: number;
}