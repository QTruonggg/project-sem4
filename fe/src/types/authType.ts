export interface ILoginType {
  email: string;
  password: string;
}
export interface IRegisterType {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}


export interface IUser {
  id: number;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  accountId: number;
  role?: string;
}
export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  user: IUser;
}
export interface IUpdateProfileType {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
}
export interface IChangePasswordType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IUpdateAvatarType {
  imageUpdate: string;
}

export interface IConfirmPasswordType {
  newPassword: string;
  confirmPassword: string;
  email: string;

}
