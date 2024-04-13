import { IAdminBlogRequest, IAdminBlogUpdateForm, IBlog, IBlogAdminList, ICustomerBlogDetail } from "@/types/blogType";
import axiosClient from "./axiosClient";

const blogApi = {
    getBlogList: (): Promise<IBlog[]> => {
        return axiosClient.get("/news");
    },
    getBlogDetail: (id: number): Promise<ICustomerBlogDetail> => {
        return axiosClient.get(`/news/${id}`);
    },
    getBlogAdmin: (): Promise<IBlogAdminList> => {
        return axiosClient.get("/admin/news");
    },
    getBlogAdminDetail: (id: number): Promise<IBlog> => {
        return axiosClient.get(`/admin/news/${id}`);
    },
    deleteBlog: (id: number): Promise<any> => {
        return axiosClient.delete(`/admin/news/${id}`);
    },
    createBlog: (data: IAdminBlogRequest) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('subject', data.subject);
        formData.append('shortDescription', data.shortDescription);
        formData.append('thumbnailFile', data.thumbnailFile as File);
        formData.append('content', data.content);
        formData.append('readTime', data.readTime.toString());

        console.log(formData);

        return axiosClient({
            method: 'post',
            url: `/admin/news`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    updateBlog: (id: number, data: IAdminBlogRequest) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('subject', data.subject);
        formData.append('thumbnail', data.thumbnail);
        formData.append('shortDescription', data.shortDescription);
        if (data.thumbnailFile) {
            formData.append('thumbnailFile', data.thumbnailFile as File);
        }
        formData.append('content', data.content);
        formData.append('readTime', data.readTime.toString());

        console.log(formData);

        return axiosClient({
            method: 'put',
            url: `/admin/news/${id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    getBlogAdminUpdate: (id: string): Promise<IAdminBlogUpdateForm> => {
        return axiosClient.get(`/admin/news/${id}/form-update`);
    }
}

export default blogApi;