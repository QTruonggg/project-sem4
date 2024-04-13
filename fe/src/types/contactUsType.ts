export interface IContactUssAdminResponse {
    contactUs: IContactUsAdminResponse[]
}
export interface IContactUsAdminResponse {
    id: number | undefined;
    email: string;
    liveChat: string;
    phone: string;
    address: string;
}