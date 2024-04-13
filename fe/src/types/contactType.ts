export interface IContactInformationRespones {
    contactUs: contactUs[]
}

export interface contactUs {
    id: number,
    email: string,
    liveChat: string,
    phone: string,
    address: string,
    latitude: string,
    longitude: string
}