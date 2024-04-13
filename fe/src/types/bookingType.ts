import exp from "constants";
import { dropdownHomestay } from "./dashboardType";

export interface IBookingList {
    bookingResponseDtos: IBookingItem[]
}

export interface IBookingItem {
    bookingCode: string,
    checkInDate: string,
    checkOutDate: string,
    householdName: string,
    householdImage: string,
    householdId: number,
    householdCheckInTime: string;
    householdCheckOutTime: string;
    householdPhoneNumberFirst: string;
    householdPhoneNumberSecond: string;
    totalNight: number,
    cancellationPeriod: number,
    totalRoom: number,
    totalGuest: number,
    totalPrice: number,
    status: string,
    bookingCheckInName?: string,
    bookingCheckInPhoneNumber?: string,
    cancellationHistory: ICancellationHistory
    isFeedbacked?: boolean
}
export interface IBookingSummary {
    roomTypeId: number,
    roomTypeName: string,
    quantity: number,
    price: number
}
export interface IBookingResponse {
    booking: IBookingItem;
    bookingSummary: IBookingSummary[];
    bookingDetails: IBookingDetail[];
}

export interface ICancellationHistory {
    id: number;
    cancellationDate: string | null;
    cancellationReason: string;
    refundAmount: number;
    refundDate: string | null;
    refundStatus: string;
}

export interface IBookingDetail {
    homestayCode: string;
    homestayAddress: string | null;
    homestayPhoneNumber: string;
    checkInCustomerName: string;
    capacityOfRoomType: number;
    quantity: number;
    roomTypeName: string;
    price: number;
    facilities: string[];
    isChildrenAndBed: boolean;
    status: string;
}

export interface IBookingCancelForm {
    bookingCancelForm: ICancelForm;

}

export interface ICancelForm {
    bookingCode: string;
    refundAmount: number;
    cancellationReasons: ICancellationReason[];
    status: string;
}


export interface ICancellationReason {
    id: number;
    reason: string;
}

export interface IBookingCancelRequest {
    bookingCode: string;
    refundAmount: number;
    cancelReason: string;
    status: string;
    accountNumber: string;
    bankName: string;
    accountOwnerName: string;
}

export interface IEditBookingInfo {
    bookingCode: string;
    customerName: string;
    customerPhone: string;
}


export interface IBookingCheckInOutResponse {
    bookingCode: string;
    bookingCustomerName: string;
    bookingCustomerPhone: string;
    bookingCustomerEmail: string;
    bookingDetailCheckInOutTodayResponseDtos: IBookingDetailCheckInOutResponse[]
    bookingStatus: string;
}

export interface IBookingDetailCheckInOutResponse {
    homestayId: number;
    homestayCode: string;
    roomTypeId: number;
    roomTypeName: string;
    roomId: number;
    roomName: string;
    totalSlot: number;
    isDorm: boolean;
}

export interface IBookingCheckInOutsResponse {
    bookingsCheckIn: IBookingCheckInOutResponse[],
    bookingsCheckOut: IBookingCheckInOutResponse[],
    checkInDate: string,
    checkOutDate: string,
    homestays: dropdownHomestay[]
}


export interface IBookingDetailsCheckInOutResponse {
    bookingDetails: IViewBookingDetailCheckInOutResponse[]
}

export interface IViewBookingDetailCheckInOutResponse {
    id: number;
    bookingCode: string;
    homestayCode: string;
    roomTypeName: string;
    roomName: string;
    slotNumber: number;
    checkInCustomerName: string;
    price: number;
    bookingDetailStatus: string;
    bookingStatus: string;
    isDorm: boolean;
}

export interface ICustomerBankInformation {
    id: number;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
}
