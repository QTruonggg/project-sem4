import { IContactUsAdminResponse, IContactUssAdminResponse } from "@/types/contactUsType";
import axiosClient from "./axiosClient";

const contactUsApi = {
    getContactUsByAdmin: (): Promise<IContactUssAdminResponse> => {
        return axiosClient.get(`admin/village/contact-us`);
    },
    updateContactUsByAdmin: async (data: IContactUsAdminResponse) => {
        console.log(data)
        let token = sessionStorage.getItem('access_token');
    
        const respones = await axiosClient({
          method: 'PUT',
          data: data,
          url: `admin/village/contact-us`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
    
        });
        return respones.data
      },
}

export default contactUsApi;