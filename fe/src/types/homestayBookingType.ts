import { ICancellationHistory, ICustomerBankInformation } from "./bookingType";

export interface IHomestayBookingResponse {
    listService: IService[];
    maxPrice: number;
    householdNameList: IHousehold[];
    householdListResponseDto?: IHouseholdResponse[];
    householdResponseDto?: IHouseholdResponse;
}

export interface IHousehold {
    householdId: number;
    householdName: string;
    householdAvatar?: string;
    phoneNumberFirst?: string;
    phoneNumberSecond?: string;
}

export interface IHouseholdService {
    householdServiceId: number;
    serviceId: number;
    imageUri: string;
    serviceName: string;
    description: string;
}

export interface IHouseholdResponse {
    householdId: number;
    householdName: string;
    householdDescription?: string;
    phoneNumber1?: string;
    phoneNumber2?: string;
    checkInTime?: string;
    checkOutTime?: string;
    address: string[];
    imageUri: string | null;
    rating: number;
    numberOfReviews: number;
    reviewHouseholdList?: IReview[];
    bookingDetailRecommendList?: IbookingDetailRecommend[];
    householdServiceList: IHouseholdService[];
    homestayAndTypeRoomAvailableList?: IHomestayAndTypeRoomAvailable[];
    numberOfGuests?: number;
    numberOfNight?: number;
    isSuitable?: boolean;
    haveDormitory: boolean;
}

export interface IbookingDetailRecommend {
    homestayId: number;
    homestayCode: string;
    roomTypeHouseholdId: number;
    roomTypeName: string;
    quantity: number;
    price: number;
    capacity: number;
    singleBed: number;
    doubleBed: number;
}
export interface IHomestayAndTypeRoomAvailable {
    homestayId: number;
    homestayCode: string;
    imageUriList: string[];
    roomTypeAvailableList: IRoomTypeAvailable[];
    capacityAvailable: number;
}

export interface IRoomTypeAvailable {
    roomTypeHouseholdId: number;
    roomTypeName: string;
    imageListUri: string[];
    capacity: number;
    singleBed: number;
    doubleBed: number;
    price: number;
    isChildrenBed: boolean;
    isDorm: boolean;
    facilities: string[];
    quantity: number;
    selectedQuantity?: number;

}

export interface ISelectedHousehold {
    householdId: number;
    householdName?: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    totalNight: number;
    address: string[];
    imageUri: string;
    checkInTime?: string;
    checkOutTime?: string;
    customerName?: string;
    customerPhone?: string;
    bookingDetailList: ISelectedBookingDetail[];
    totalPrice: number;
    paymentGateway?: string;
}



export interface IService {
    serviceId: number;
    serviceName: string;
    serviceAvatar: string;
}

export interface IReview {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    rating: number;
    content: string;
}

export interface ISelectedBookingDetail {
    homestayId: number;
    homestayCode?: string;
    householdRoomTypeId: number;
    roomTypeName?: string;
    customerCheckInName?: string;
    customerCheckInPhone?: string;
    quantity?: number;
    price?: number;

}

export interface IBookingPayment {
    bookingCode: string;
    paymentGateway: string;
    status: string;
    paymentUrl: string;
    message: string
}

export interface IVnpayResponse {
    bookingCode: string;
    houseName: string;
    payDate: string;
    description: string;
    amount: string;
    paymentMethod: string;
    bankCode: string;
    paymentStatus: string;
    message: string;
}

// duc anh 101

export interface IBookingInformation {
    checkInDate: string | null,
    checkOutDate: string | null,
    totalNight: number,
    totalOfGuest: number,
    checkInCustomerName: string,
    checkInCustomerPhone: string,
    checkInCustomerEmail: string,
    totalRoom: number,
    bookingDetails: bookingDetails[],
    totalPrice: number
}

export interface bookingDetails {
    [x: string]: any;
    homestayId: number,
    price: number,
    subTotal: number,
    dormSlotId: number,
    householdRoomTypeId: number,
    roomId: number,
}

export interface IViewBookingResponse {
    bookings: IBooking[];

}

export interface IBooking {
    bookingCode: string,
    createdDate: string,
    bookingCustomerName: string,
    bookingCustomerPhoneNumber: string,
    checkInDate: string,
    checkOutDate: string,
    totalGuest: number,
    totalRoom: number,
    totalPrice: number,
    bookingStatus: string,
    paymentStatus: string,
    customerBankInformation: ICustomerBankInformation,
    cancellationHistory: ICancellationHistory
}


export interface bookingManagerSummaryWithDetails {
    bookingManagerResponseDto: bookingManagerResponseDto,
    bookingSummaryDtos: bookingSummaryDtos[];
    bookingDetailManagerResponseDtos: bookingDetailManagerResponseDtos[];
}


export interface bookingDetailManagerResponseDtos {
    id: number,
    bookingCod: string,
    homestayCode: string,
    roomTypeName: string,
    roomName: string,
    slotNumber: number,
    checkInCustomerName: string,
    price: number,
    bookingDetailStatus: string,
    bookingStatus: string,
    isDorm: boolean,
}

export interface bookingSummaryDtos {
    roomTypeId: number,
    roomTypeName: string,
    quantity: number,
    price: number
}

export interface bookingManagerResponseDto {
    bookingCode: string,
    createdDate: string,
    bookingCustomerName: string,
    bookingCustomerPhoneNumber: string,
    totalNight: number,
    checkInDate: string,
    checkOutDate: string,
    totalGuest: number,
    totalRoom: number,
    totalPrice: number,
    bookingStatus: string,
    paymentStatus: string,
    paymentType: string,
    paymentDate: string,
    cancellationHistory: string
}

export interface bookingCancelManagerResponseDto {
    bookingCode: string,
    refundAmount: number,
    cancellationReasons: cancellationReasons[],
    refundStatuses: string[]
}

export interface cancellationReasons {
    id: number,
    reason: string
}

export interface BookingRandomDormSlotManagerRequestDto {
    checkInDate: string,
    checkOutDate: string,
    bookingDetails: BookingDetailRandomDormSlot[],
}

export interface BookingDetailRandomDormSlot {
    homestayId: number,
    homestayName: string,
    price: number,
    subTotal: number,
    totalSlotDefault: number,
    totalSlotSelected: number,
    householdRoomTypeId: number,
    householdRoomTypeName: string,
    roomId: number,
    roomName: string,
    isDorm: boolean,
}

export interface IRandomDormSlotResponse {
    householdId: number | undefined,
    checkInDate: string | null | undefined,
    checkOutDate: string | null | undefined,
    totalNight: number | undefined,
    totalOfGuest: number,
    checkInCustomerName: string,
    checkInCustomerPhone: string,
    checkInCustomerEmail: string,
    totalRoom: number | undefined,
    bookingDetails: randomBookingDetails[] | undefined,
    totalPrice: number | undefined,
}

export interface randomBookingDetails {
    homestayId: number,
    homestayName: string,
    price: number,
    subTotal: number,
    dormSlotId: number,
    dormSlotName: string,
    householdRoomTypeId: number,
    householdRoomTypeName: string,
    roomId: number,
    roomName: string,
    isDorm: boolean,
}

export interface IGetDropDownCancelBookingResponse {
    bookingCode: string,
    refundAmount: number,
    cancellationReasons: cancellationReasons[],
    refundStatuses: string[],
    cancellationPeriod: number,
}

export interface cancellationReasons {
    id: number,
    reason: string,
}
export interface IDropDownCancelBookingRequest {
    bookingCode: string | undefined,
    refundAmount: number | undefined,
    cancellationReasons: string | undefined,
    refundStatuses: string | undefined,
}
export interface IBookingCancelManagerRequestDto {
    bookingCode: string | undefined,
    refundAmount: number | undefined,
    cancelReason: string | undefined,
    refundStatus: string | undefined,
}

export interface IEditBookingRequest {
    bookingCode: string | undefined,
    bookingCustomerName: string | undefined,
    bookingCustomerPhoneNumber: string | undefined,
}