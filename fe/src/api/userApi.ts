import { IInsertUserType, IUserDetailType, IUserType } from "@/types/userType";
import axiosClient from "./axiosClient";
import { IMessagesResponse } from "@/types/apiReturnType";

const userApi = {
    getAllUser: (): Promise<IUserType> => {
        return axiosClient.get("/admin/users");
    },
    getUserDetail: (accountId: number): Promise<IUserDetailType> => {
        return axiosClient.get(`/admin/users/${accountId}`);
    },
    changeUserActiveStatus: (accountId: number): Promise<IMessagesResponse> => {
        return axiosClient.patch(`/admin/users/${accountId}`);
    },
    deleteUser: (accountId: number): Promise<IMessagesResponse> => {
        return axiosClient.delete(`/admin/users/${accountId}`);
    },
    insertUser: (data: IInsertUserType): Promise<IMessagesResponse> => {
        return axiosClient.post("/admin/users", data);
    }

};

export default userApi;
