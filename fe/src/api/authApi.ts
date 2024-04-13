import { IChangePasswordType, IConfirmPasswordType, ILoginResponse, ILoginType, IRegisterType, IUpdateAvatarType, IUpdateProfileType, IUser } from '@/types/authType';
import axiosClient from './axiosClient';
import { IMessagesResponse } from '@/types/apiReturnType';


const authApi = {
  login: (body: ILoginType): Promise<ILoginResponse> => {
    return axiosClient.post('/auth/login', body);
  },
  logout: (body: ILoginType): Promise<ILoginResponse> => {
    return axiosClient.post('/auth/logout', body);
  },
  register: (body: IRegisterType): Promise<IMessagesResponse> => {
    return axiosClient.post('/auth/register', body);
  }
  ,
  getCurrentUser: (): Promise<IUser> => {
    return axiosClient.get('/customers/my-profile');
  },
  getCurrentUserManager: (): Promise<IUser> => {
    return axiosClient.get('/managers/my-profile');
  },
  getCurrentUserAdmin: (): Promise<IUser> => {
    return axiosClient.get('/admins/my-profile');
  },
  updateProfile: (body: IUpdateProfileType): Promise<IMessagesResponse> => {
    return axiosClient.patch('/customers/my-profile', body);
  },
  updateManagerProfile: (body: IUser): Promise<IMessagesResponse> => {
    return axiosClient.put('/managers/my-profile', body);
  },
  updateAdminProfile: (body: IUser): Promise<IMessagesResponse> => {
    return axiosClient.put('/admins/my-profile', body);
  },
  updateAvatar: (image: File): Promise<IUpdateAvatarType> => {
    const formData = new FormData();
    formData.append('image', image);
    return axiosClient({
      method: 'put',
      url: `/customers/avatar`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteAvatar: (): Promise<IMessagesResponse> => {
    return axiosClient.delete('/customers/avatar');
  },
  updateManagerAvatar: (image: File): Promise<IUpdateAvatarType> => {
    const formData = new FormData();
    formData.append('image', image);
    return axiosClient({
      method: 'put',
      url: `/managers/my-profile/avatar`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  updateAdminAvatar: (image: File): Promise<IUpdateAvatarType> => {
    const formData = new FormData();
    formData.append('image', image);
    return axiosClient({
      method: 'put',
      url: `/admins/my-profile/avatar`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  confirmEmail: (
    token: string,
    firstName: string,
    lastName: string
  ): Promise<IMessagesResponse> => {
    return axiosClient.post("/auth/confirm-account?token=" + token
      + "&firstName=" + firstName
      + "&lastName=" + lastName);
  },
  changePassword: (body: IChangePasswordType): Promise<IMessagesResponse> => {
    return axiosClient.post('/auth/change-password', body);
  },
  verifyOtp: (body: string): Promise<IMessagesResponse> => {
    return axiosClient.post('/auth/verify-otp', { "otp": body });
  },
  forgotPassword: (body: string): Promise<IMessagesResponse> => {
    return axiosClient.post('/auth/reset-password', { "email": body });
  },
  changeForgotPassword: (data:IConfirmPasswordType): Promise<IMessagesResponse> => {
    return axiosClient.post('/auth/change-password-for-reset', data );
  },
  loginSocial: (body: any): Promise<ILoginResponse> => {
    return axiosClient.post('/auth/social-login', body);
  }
};

export default authApi;
