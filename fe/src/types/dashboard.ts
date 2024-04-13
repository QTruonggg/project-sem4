export interface DashboardManager {
    dashboard: dashboard,
    roomStatusManagement: roomStatusManagement[],
}

export interface dashboard {
    totalHomestay: number,
    totalDorm: number,
    totalRoom: number,
    totalCapacity: number,
    totalCheckInToday: number,
    totalCheckOutToday: number,
    totalBookingToday: number,
    totalFeedback: number,
    totalFeedbackScore: number,
    bookingCancelListForManager: bookingCancelListForManager[],
    session: string,
    temperature: string,
    weather: string,

}

export interface roomStatusManagement {
    homestayId: string,
    homestayCode: string,
    roomInformationForDashboards: roomInformationForDashboards[]
    dormitoryInformationForDashboards: dormitoryInformationForDashboards[]
}

export interface dormitoryInformationForDashboards {
    roomId: number,
    roomName: string,
    roomTypeName: string,
    availableSlot: number,
    totalSlot: number,
}

export interface roomInformationForDashboards {
    roomId: number,
    roomName: string,
    roomTypeName: string,
    bookingCode: string,
    customerName: string,
    available: boolean,
}

export interface bookingCancelListForManager {
    bookingCode: string,
    createdDate: string,
    customerFirstName: string,
    customerLastName: string,
    refundAmount: number
}


export interface DashboardAdmin {
    totalArea: number,
    totalHousehold: number,
    totalHomestay: number,
    totalRoomType: number,
    totalUser: number,
    totalService: number,
    totalLocalProduct: number,
    totalNews: number,
    requestDetailListForAdmin: requestDetailListForAdmin[],
    session: string,
    temperature: number,
    weather: string,
    getTotalGuestByMonthForThisYear: number[],
    getTotalGuestByMonthForLastYear: number[],
}

export interface requestDetailListForAdmin {
    requestId: number,
    householdName: string,
    createdDate: string,
    requestTitle: string,
}