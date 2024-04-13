import { IAdminReport, IHouseholdRevenueReport, IManagerBookingReport, IManagerRoomTypeReport } from "@/types/reportType";
import axiosClient from "./axiosClient"

const reportApi = {
    getAdminReport: (checkInDate: string, checkOutDate: string): Promise<IAdminReport> => {
        return axiosClient.get(`/admin/report?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
    },
    getManagerBookingReport: (checkInDate: string, checkOutDate: string): Promise<IManagerBookingReport> => {
        return axiosClient.get(`/manager/report/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
    },
    getManagerRoomTypeReport: (checkInDate: string, checkOutDate: string): Promise<IManagerRoomTypeReport> => {
        return axiosClient.get(`/manager/report/room-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
    },
    getManagerCancelBookingReport: (checkInDate: string, checkOutDate: string): Promise<IManagerBookingReport> => {
        return axiosClient.get(`/manager/report/booking-cancel?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
    },
    exportAdminReport: (checkInDate: string, checkOutDate: string) => {
        return axiosClient.get(`/admin/report/export?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`, {
            responseType: 'arraybuffer',
          })
    },
    getHouseholdRevenueReport: (checkInDate: string, checkOutDate: string): Promise<IHouseholdRevenueReport> => {
        return axiosClient.get(`/admin/report/household-payment?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
    }
}
export default reportApi;