import axiosClient from "./axiosClient";

const imageGalleryApi = {
    getCustomerImages: (): Promise<string[]> => {
        return axiosClient.get(`/gallery`);
    },
}

export default imageGalleryApi;