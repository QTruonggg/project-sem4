export interface INotificationResponse {
    id: number,
    title: string,
    content: string,
    type: string,
    isRead: boolean,
    toWhom: number,
}

export interface INotification {
    id: number,
    content: JSX.Element,
    bookingCode: string,
    type: string,
}