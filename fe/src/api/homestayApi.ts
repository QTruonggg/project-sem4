import { IHomestayDetailAdminResponse, IHomestayFormUpdateAdminResponse, IHomestayFormUpdateRequestAdmin, IHomestayFormUpdateResponseAdmin, IHomestaysAdminResponse } from "@/types/homestayType";
import axiosClient from "./axiosClient";
import { IGetAllHomestayResponse, IhomestayManagerList } from "@/types/dashboardType";


const homestayApi = {
  getAllHomestay: (): Promise<IGetAllHomestayResponse> => {
    return axiosClient.get(`manager/homestay`);
  },
  deleteHomestay: async (id: number): Promise<IGetAllHomestayResponse> => {
    let token = localStorage.getItem('access_token');
    try {
      const response = await axiosClient({
        method: 'DELETE',
        url: `/manager/homestay/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting homestay:', error);
      throw error;
    }
  },
  deactiveHomestay: async (id: number): Promise<IGetAllHomestayResponse> => {
    let token = localStorage.getItem('access_token');
   
    try {
      const response = await axiosClient({
        method: 'DELETE',
        url: `/manager/homestay/${id}/hide`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deacting homestay:', error);
      throw error;
    }
  },
  deactiveHomestayByAdmin: async (id: number): Promise<any> => {
    let token = localStorage.getItem('access_token');
   
    try {
      const response = await axiosClient({
        method: 'PUT',
        url: `/admin/homestays/${id}/hide`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deacting homestay:', error);
      throw error;
    }
  },
  showHomestayByAdmin: async (id: number): Promise<any> => {
    let token = localStorage.getItem('access_token');
   
    try {
      const response = await axiosClient({
        method: 'PUT',
        url: `/admin/homestays/${id}/show`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deacting homestay:', error);
      throw error;
    }
  },
  getHomestayDetail: (id: number): Promise<IhomestayManagerList> => {
    return axiosClient.get(`manager/homestay/` + id);
  },
  updateHomestay: (data: IhomestayManagerList, id: number): Promise<IhomestayManagerList> => {
    const formData = new FormData();


    formData.append('homestayId', Number(data.homestayId).toString());
    formData.append('homestayCode', (data.homestayCode));
    formData.append('totalRoom', Number(data.totalRoom).toString());
    formData.append('totalDorm', Number(data.totalDorm).toString());
    formData.append('address', (data.address));
    formData.append('homestayStatus', (data.homestayStatus));



    if (data.homestayMediaList.length > 0) {
      data.homestayMediaList.forEach((media, index) => {
        formData.append(`homestayMediaList[${index}].id`, Number(media.id).toString());
        formData.append(`homestayMediaList[${index}].fileName`, media.fileName);
        formData.append(`homestayMediaList[${index}].filePath`, media.filePath);
        formData.append(`homestayMediaList[${index}].type`, media.type);
      });
    } else {
      formData.append('homestayMediaList', "");
    }


    try {
      data.imagesFile.forEach((file) => {
        formData.append('imagesFile', file);
      }); // check if file is empty
    } catch (error) {
      formData.append('imagesFile', new Blob());
    }

    return axiosClient({
      method: 'put',
      url: `/manager/homestay/${id}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  getAllHomestayByAdmin: (): Promise<IHomestaysAdminResponse> => {
    return axiosClient.get(`admin/homestays`);
  },
  getHomestayAdmin: (homestayId: number): Promise<IHomestayDetailAdminResponse> => {
    return axiosClient.get(`admin/homestays/${homestayId}`);
  },
  deleteHomestayByAdmin: async (homestayId: number): Promise<any> => {
    let token = localStorage.getItem('access_token');
    try {
      const response = await axiosClient({
        method: 'DELETE',
        url: `admin/homestays/${homestayId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting homestay:', error);
      throw error;
    }
  },
  getHomestayFormUpdateAdmin: (homestayId: number): Promise<IHomestayFormUpdateAdminResponse> => {
    return axiosClient.get(`admin/homestays/${homestayId}/form-update`);
  },
  updateHomestayByAdmin: async (data: IHomestayFormUpdateRequestAdmin) => {
    console.log(data)
    let token = sessionStorage.getItem('access_token');

    const respones = await axiosClient({
      method: 'PUT',
      data: data,
      url: `admin/homestays`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },

    });
    return respones.data
  },
  getHomestayFormCreateAdmin: (): Promise<IHomestayFormUpdateResponseAdmin> => {
    return axiosClient.get(`admin/homestays/form-create`);
  },
  createHomestayByAdmin: async (data: IHomestayFormUpdateRequestAdmin) => {
    console.log(data)
    let token = sessionStorage.getItem('access_token');

    const respones = await axiosClient({
      method: 'POST',
      data: data,
      url: `admin/homestays`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },

    });
    return respones.data
  },
}

export default homestayApi;