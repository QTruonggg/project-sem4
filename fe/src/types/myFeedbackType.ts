export interface IMyFeedbackList {
    feedbackResponseDtos: IMyFeedbackItem[];
  }
  
  export interface IMyFeedbackItem {
    id: number;
    householdName: string;
    totalRoom: number;
    totalGuest: number;
    totalPrice: number;
    checkInDate: string;
    checkOutDate: string;
    rating: number;
    content: string;
  }
  export interface IUpdateFeedbackItem{
    bookingCode?: string;
    feedbackId?: number;
    rating: number;
    content: string;
  }