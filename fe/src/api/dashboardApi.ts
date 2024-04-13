
import { DashboardAdmin, DashboardManager } from "@/types/dashboard";
import axiosClient from "./axiosClient";

const dashboardApi = {
    getDashboardInformatiuon: (): Promise<DashboardManager> => {
        return axiosClient.get(`manager/dashboard`);
    },
    getDashboardAdminInformatiuon: (): Promise<DashboardAdmin> => {
        return axiosClient.get(`admin/dashboard`);
    }
}

export default dashboardApi;