import { IGetDropDownBookingResponse, searchRoomEmptyResponse } from "@/types/dashboardType";
import axiosClient from "./axiosClient";
import { BookingDetailRandomDormSlot, BookingRandomDormSlotManagerRequestDto, IBookingCancelManagerRequestDto, IDropDownCancelBookingRequest, IEditBookingRequest, IGetDropDownCancelBookingResponse, IRandomDormSlotResponse, IViewBookingResponse, bookingCancelManagerResponseDto, bookingManagerSummaryWithDetails } from "@/types/homestayBookingType";
import { IBookingCheckInOutsResponse, IBookingDetailsCheckInOutResponse } from "@/types/bookingType";

const bookingManagerApi = {
  getDropDownBooking: (): Promise<IGetDropDownBookingResponse> => {
    return axiosClient.get(`manager/homestay/search`);
  },
  searchRoomEmpty: async (checkInDate: string | undefined, checkOutDate: string | undefined): Promise<searchRoomEmptyResponse> => {
    let token = localStorage.getItem('access_token');

    return await axiosClient({
      method: 'GET',
      url: `manager/room/search-to-book?` + `checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  },
  searchRoomEmptyById: async (homestayId: number | undefined, checkInDate: string | undefined, checkOutDate: string | undefined): Promise<searchRoomEmptyResponse> => {
    let token = localStorage.getItem('access_token');

    return await axiosClient({
      method: 'GET',
      url: `manager/room/search-to-book?` + `homestayId=${homestayId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  },
  getViewBookingInformation(): Promise<IViewBookingResponse> {
    return axiosClient.get(`manager/bookings`);
  },
  getBookingDetails(id: string): Promise<bookingManagerSummaryWithDetails> {

    return axiosClient.get(`manager/bookings/${id}`);
  },
  updatePayment: async (record: string | undefined): Promise<bookingManagerSummaryWithDetails> => {
    let token = localStorage.getItem('access_token');
    try {
      const response = await axiosClient({
        method: 'PUT',
        url: `/manager/payments/${record}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error change payment', error);
      throw error;
    }
  },
  getDropDownCancel: async (id: string): Promise<bookingCancelManagerResponseDto> => {

    return await axiosClient.get(`manager/bookings/${id}/cancel-form`);
  },
  bookingRandomDormSlot: async (data: BookingRandomDormSlotManagerRequestDto): Promise<IRandomDormSlotResponse> => {
    let token = localStorage.getItem('access_token'); 
    return await axiosClient({
      method: 'PUT',
      url: `manager/room/random-dorm-slots`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
  },
  getDropDownCancelBooking: async (id: string): Promise<IGetDropDownCancelBookingResponse> => {
    return await axiosClient.get(`manager/bookings/${id}/cancel-form`);
  },
  cancelBooking: async (data: IBookingCancelManagerRequestDto): Promise<IDropDownCancelBookingRequest> => {
    let token = localStorage.getItem('access_token');
    return await axiosClient({
      method: 'DELETE',
      url: `manager/bookings`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  },
  editInformationBooking: async (data: IEditBookingRequest): Promise<IEditBookingRequest> => {
    return await axiosClient({
      method: 'PUT',
      url: `manager/bookings`,
      data: data,
    });
  },
  getBookingInOut: (): Promise<IBookingCheckInOutsResponse> => {
    return axiosClient.get(`manager/bookings/check-in-out-today`);
  },
  checkInBooking: async (bookingCode: string): Promise<any> => {
    let token = localStorage.getItem('access_token');
    return await axiosClient({
      method: 'PUT',
      url: `manager/bookings/${bookingCode}/check-in`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  },
  checkOutBooking: async (bookingCode: string): Promise<any> => {
    let token = localStorage.getItem('access_token');
    return await axiosClient({
      method: 'PUT',
      url: `manager/bookings/${bookingCode}/check-out`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  },
  getBookingDetailInOut: async (bookingCode: string): Promise<IBookingDetailsCheckInOutResponse> => {
    return await axiosClient.get(`manager/bookings/check-in-out-today/${bookingCode}`);
  },
  checkInBookingDetail: async (bookingCode: string, bookingDetailIds: React.Key[]): Promise<any> => {
    let token = localStorage.getItem('access_token');
    try {
      const response = await axiosClient({
        method: 'PUT',
        url: `manager/booking-detail/${bookingCode}/check-in`,
        data: bookingDetailIds,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting homestay:', error);
      throw error;
    }
  },
  checkOutBookingDetail: async (bookingCode: string, bookingDetailIds: React.Key[]): Promise<any> => {
    let token = localStorage.getItem('access_token');
    try {
      const response = await axiosClient({
        method: 'PUT',
        url: `manager/booking-detail/${bookingCode}/check-out`,
        data: bookingDetailIds,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      return response.data;
    } catch (error) {
    }
  },
  searchCheckOutById: async (selectedHomestayId: number | undefined,checkOutDate: string | undefined): Promise<IBookingCheckInOutsResponse> => {
    let token = localStorage.getItem('access_token');

    return await axiosClient({
      method: 'GET',
      url: `manager/bookings/check-in-out-today?` + `homestayId=${selectedHomestayId}&checkOutDate=${checkOutDate}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  },
  searchCheckOut: async (checkOutDate: string | undefined): Promise<IBookingCheckInOutsResponse> => {
    let token = localStorage.getItem('access_token');

    return await axiosClient({
      method: 'GET',
      url: `manager/bookings/check-in-out-today?` + `checkOutDate=${checkOutDate}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  },
  searchCheckInById: async (selectedHomestayId: number | undefined,checkInDate: string | undefined): Promise<IBookingCheckInOutsResponse> => {
    let token = localStorage.getItem('access_token');

    return await axiosClient({
      method: 'GET',
      url: `manager/bookings/check-in-out-today?` + `homestayId=${selectedHomestayId}&checkInDate=${checkInDate}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  },
  searchCheckIn: async (checkInDate: string | undefined): Promise<IBookingCheckInOutsResponse> => {
    let token = localStorage.getItem('access_token');
    console.log(checkInDate);

    return await axiosClient({
      method: 'GET',
      url:  `manager/bookings/check-in-out-today?` + `checkInDate=${checkInDate}`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  },
  refundBooking: async (bookingCode: string): Promise<any> => {
    let token = localStorage.getItem('access_token');

    return await axiosClient({
      method: 'PUT',
      url: `manager/bookings/${bookingCode}/refund`,
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });
  }
}


export default bookingManagerApi;