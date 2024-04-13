import { CustomerLocalProductType, IEditlocalProductListForAdmin, IListTypeLocalProduct, ILocalProductList, IdAndPositionlocalProductTop, IlocalProductListForAdmin, IlocalProductListForAdminResponse, LocalProductDetailType, localProductTop5DetailForAdmins } from "@/types/localProductType";
import axiosClient from "./axiosClient";
const localProductApi = {
  getlocalProductListForAdmin: (): Promise<IlocalProductListForAdminResponse> => {
    return axiosClient.get(`admin/local-product `);
  },
  getlocalProductListForAdminDetail: (id: number): Promise<IEditlocalProductListForAdmin> => {
    return axiosClient.get(`admin/local-product/edit/${id}`);
  },
  deleteLocalProduct: (id: number): Promise<any> => {
    return axiosClient.put(`admin/local-product/${id}/delete`);
  },
  hideLocalProductdByAdmin: (id: number): Promise<IlocalProductListForAdmin> => {
    return axiosClient.put(`admin/local-product/${id}/inactive`);
  },
  showLocalProductdByAdmin: (id: number): Promise<IlocalProductListForAdmin> => {
    return axiosClient.put(`admin/local-product/${id}/active`);
  },
  getCustomerLocalProductList: (): Promise<CustomerLocalProductType> => {
    return axiosClient.get(`/customer/local-product`);
  },
  getCustomerLocalProductDetail: (localProductId: number): Promise<LocalProductDetailType> => {
    return axiosClient.get(`/customer/local-product/${localProductId}`);
  },
  updateLocalProduct: async (data: IEditlocalProductListForAdmin): Promise<IEditlocalProductListForAdmin> => {
    try {
      const formData = new FormData();

      formData.append('localProductId', Number(data.localProductId).toString());
      formData.append('localProductName', data.localProductName);
      formData.append('localProductType', (data.localProductType).toString());
      formData.append('localProductDescription', (data.localProductDescription).toString());
      formData.append('localProductUnit', (data.localProductUnit).toString());
      formData.append('localProductMinPrice', Number(data.localProductMinPrice).toString());
      formData.append('localProductMaxPrice', Number(data.localProductMaxPrice).toString());

      // Đặt danh sách homestayMedias
      if (data.villageMedias.length > 0) {
        data.villageMedias.forEach((media, index) => {
          formData.append(`villageMedias[${index}].id`, Number(media.id).toString());
          formData.append(`villageMedias[${index}].fileName`, media.fileName);
          formData.append(`villageMedias[${index}].filePath`, media.filePath);
          formData.append(`villageMedias[${index}].type`, "IMAGE");
        });
      } else {
        formData.append('villageMedias', "");
      }

      try {
        data.imagesFile.forEach((file) => {
          formData.append('imagesFile', file);
        }); // check if file is empty
      } catch (error) {
        formData.append('imagesFile', new Blob());
      }


      const response = await axiosClient({
        method: 'put',
        url: `/admin/local-product/edit`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        localProductApi.getlocalProductListForAdminDetail(data.localProductId);
      }
      return response.data;
    } catch (error) {
      console.error('Error editing room type:', error);
      throw error;
    }
  },
  getListType: (): Promise<IListTypeLocalProduct> => {
    return axiosClient.get(`admin/local-product/add`);
  },
  addNewLocalProduct: async (data: IEditlocalProductListForAdmin): Promise<IEditlocalProductListForAdmin> => {
    try {
      const formData = new FormData();

      formData.append('localProductId', Number(data.localProductId).toString());
      formData.append('localProductName', data.localProductName);
      formData.append('localProductType', (data.localProductType).toString());
      formData.append('localProductDescription', (data.localProductDescription).toString());
      formData.append('localProductUnit', (data.localProductUnit).toString());
      formData.append('localProductMinPrice', Number(data.localProductMinPrice).toString());
      formData.append('localProductMaxPrice', Number(data.localProductMaxPrice).toString());

      try {
        data.imagesFile.forEach((file) => {
          formData.append('imagesFile', file);
        }); // check if file is empty
      } catch (error) {
        formData.append('imagesFile', new Blob());
      }


      const response = await axiosClient({
        method: 'post',
        url: `/admin/local-product/add`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });


      return response.data;
    } catch (error) {
      console.error('Error add room type:', error);
      throw error;
    }
  },
  getTopLocalProductForAdmin(): Promise<ILocalProductList> {
    return axiosClient.get(`admin/local-product/top`);
  },
  deleteTopLocalProduct: async (data: IdAndPositionlocalProductTop): Promise<IdAndPositionlocalProductTop> => {

    const response = await axiosClient({
      method: 'put',
      url: `/admin/local-product/delete-position`,
      data: data,
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  },
  addTopLocalProduct: async (data: IdAndPositionlocalProductTop): Promise<IdAndPositionlocalProductTop> => {
    const response = await axiosClient({
      method: 'put',
      url: `/admin/local-product/set-position`,
      data: data,
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  }
}

export default localProductApi;