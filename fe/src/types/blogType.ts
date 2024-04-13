
export interface IBlog {
    id: number;
    title: string;
    subject: string;
    shortDescription: string;
    thumbnail: string;
    readTime: number;
    createdDate: string;
}
export interface ICustomerBlogDetail {
    threeNews: IBlog[];
    news: IBlogDetail;
}
export interface IBlogDetail {
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    id: number;
    title: string;
    subject: string;
    shortDescription: string;
    thumbnail: string;
    content: string;
    readTime: number;
}
export interface IBlogAdminList {
    news: IBlogAdmin[];
    newsSubjects: IBlogSubject[];
}
export interface IBlogAdmin {
    id: number;
    title: string;
    subject: string;
    shortDescription: string;
    thumbnail: string;
    readTime: number;
    createdDate: string;
}
export interface IBlogSubject {
    code: string;
    name: string;
}
export interface IAdminBlogDetail {
    news: IBlogDetail;
}
export interface IAdminBlogRequest {
    title: string;
    subject: string;
    shortDescription: string;
    thumbnail: string;
    thumbnailFile?: File;
    content: string;
    readTime: number;
}
export interface IAdminBlogUpdateForm {
    newsSubjects: IBlogSubject[];
    news: IAdminBlogRequest;
}