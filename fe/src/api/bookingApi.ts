import { IBookingList, IBookingResponse, IBookingCancelForm, IBookingCancelRequest, IEditBookingInfo } from "@/types/bookingType";
import axiosClient from "./axiosClient";
import { IMessagesResponse } from "@/types/apiReturnType";

const bookingApi = {
    getBooking: (): Promise<IBookingList> => {
        return axiosClient.get('/customers/my-booking');
    },
    getBookingDetail: (id: string): Promise<IBookingResponse> => {
        return axiosClient.get(`/customers/my-booking/${id}`);
    },
    getDoneBooking: (): Promise<IBookingList> => {
        return axiosClient.get('/customers/my-booking-history');
    }, 
    getCancelBooking: (): Promise<IBookingList> => {
        return axiosClient.get('/customers/my-booking-cancel');
    },
    getCancellationForm: (bookingCode: string): Promise<IBookingCancelForm> => {
        return axiosClient.get(`/customers/booking/${bookingCode}/cancel-form`);
    },
    cancelBooking: (data: IBookingCancelRequest) : Promise<IMessagesResponse> => {
        return axiosClient.delete('customers/booking',{data});
    },
    editBookingInfo: (data: IEditBookingInfo) : Promise<IMessagesResponse> => {
        return axiosClient.patch('customers/booking', data);
    }

};

export default bookingApi;