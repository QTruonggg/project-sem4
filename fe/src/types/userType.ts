
export interface IUserType {
    numberOfAdmin: number;
    numberOfManager: number;
    numberOfCustomer: number;
    userInfoResponseDto: UserInfoResponseDto[];
    householdName: HouseholdName[];
}

export interface HouseholdName {
    householdId: number;
    householdName: string;
}

export interface UserInfoResponseDto {
    accountId: number;
    avatar: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdDate?: string;
    houseHoldName?: string;
    status: string;
}
export interface IInsertUserType {
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    householdId?: number;
}

export interface IUserDetailType {
    userDetail: IUserData;
    householdInfo?: IHousholdInfo;
    bookingOfCustomer?: IBookingOfCustomer[];
}

export interface IUserData {
    avatar: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    role: string;
    status: string;
}

export interface IHousholdInfo {
    householdName: string;
    householdAvatar: string;
    householdPhone1: string;
    householdPhone2: string;
    householdEmail: string;
    householdStatus: string;
    homestayCode: string[];
}

export interface IBookingOfCustomer {
    bookingCode: string;
    householdAvatar: string;
    householdName: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuest: number;
    numberOfNight: number;
    totalAmount: number;
    bookingStatus: string;
}
