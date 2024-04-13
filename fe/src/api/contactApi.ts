import axiosClient from "./axiosClient";
import { IContactInformationRespones } from "@/types/contactType";

const contactApi = {
    getContactInformatin: ():Promise<IContactInformationRespones> => {
        return axiosClient.get('/village/contact-us');
    },

}

export default contactApi;