export interface IListFeedback {
    feedbackListForManager: IFeedback[];
    averageRating: number;
}
export interface IFeedback {
    feedbackId: number;
    bookingCode: string;
    homestayCode: string;
    totalRoom: number;
    totalGuest: null;
    checkInDate: string;
    checkOutDate: string;
    createdDate: string;
    totalPrice: number;
    content: string;
    rating: number;
    status: string;
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
}