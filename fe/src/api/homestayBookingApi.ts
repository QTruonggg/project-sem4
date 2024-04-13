import axiosClient from "./axiosClient";
import { IBookingInformation, IBookingPayment, IHomestayBookingResponse, IRandomDormSlotResponse, ISelectedHousehold, IVnpayResponse } from "@/types/homestayBookingType";

const homestayBookingApi = {
    getBooking: (): Promise<IHomestayBookingResponse> => {
        return axiosClient.get('/booking');
    },
    searchBooking: (
        householdId: string,
        checkInDate: string,
        checkOutDate: string,
        numberOfGuests: string
    ): Promise<IHomestayBookingResponse> => {
        return axiosClient.get(`/booking/search?householdId=${householdId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuests=${numberOfGuests}`);
    },
    payBooking: (data: ISelectedHousehold): Promise<IBookingPayment> => {
        return axiosClient.post('/customers/booking', data);
    },
    getPaymentStatus: (paymentUrl: string): Promise<IVnpayResponse> => {
        return axiosClient.get('/customers/payment/vnpay?' + paymentUrl);
    },
    addBooking: async(data: IRandomDormSlotResponse): Promise<IRandomDormSlotResponse> => {
        const response = await axiosClient({
                method: 'POST',
                url: '/manager/bookings',
                data: data,
              });
            return response.data;
        }
};

export default homestayBookingApi;