import { ILibraryVillage, IVillageInformationResponse, IVillageInformationsResponse, InformationAdminRequestDto } from "@/types/villageInformationType";
import axiosClient from "./axiosClient";
import { title } from "process";


const villageInformationApi = {
  getVillageInformationsByAdmin: (): Promise<IVillageInformationsResponse> => {
    return axiosClient.get(`admin/village/information`);
  },
  getAllVillageMedia: (): Promise<ILibraryVillage> => {
    return axiosClient.get(`admin/village-media`);

  },
  updateVillageMedia: (data: ILibraryVillage): Promise<ILibraryVillage> => {
    const formData = new FormData();
    if (data.imageHomeMain.length > 0) {
      data.imageHomeMain.forEach((media, index) => {
        formData.append(`imageHomeMain[${index}].id`, Number(media.id).toString());
        formData.append(`imageHomeMain[${index}].fileName`, media.fileName);
        formData.append(`imageHomeMain[${index}].filePath`, media.filePath);
        formData.append(`imageHomeMain[${index}].type`, media.type);
        formData.append(`imageHomeMain[${index}].position`, media.position);
      });
    } else {
      formData.append('imageHomeMain', "");
    }
    try {
      data.imageHomeMainUpload.forEach((file) => {
        formData.append('imageHomeMainUpload', file);
      }); // check if file is empty
    } catch (error) {
      formData.append('imageHomeMainUpload', new Blob());
    }

    if (data.imageHomeSub.length > 0) {
      data.imageHomeSub.forEach((media, index) => {
        formData.append(`imageHomeSub[${index}].id`, Number(media.id).toString());
        formData.append(`imageHomeSub[${index}].fileName`, media.fileName);
        formData.append(`imageHomeSub[${index}].filePath`, media.filePath);
        formData.append(`imageHomeSub[${index}].type`, media.type);
        formData.append(`imageHomeSub[${index}].position`, media.position);
      });
    } else {
      formData.append('imageHomeSub', "");
    }

    try {
      data.imageHomeSubUploads.forEach((file) => {
        formData.append('imageHomeSubUploads', file);
      }); // check if file is empty
    } catch (error) {
      formData.append('imageHomeSubUploads', new Blob());
    }


    if (data.imageGallery.length > 0) {
      data.imageGallery.forEach((media, index) => {
        formData.append(`imageGallery[${index}].id`, Number(media.id).toString());
        formData.append(`imageGallery[${index}].fileName`, media.fileName);
        formData.append(`imageGallery[${index}].filePath`, media.filePath);
        formData.append(`imageGallery[${index}].type`, media.type);
        formData.append(`imageGallery[${index}].position`, media.position);
      });
    } else {
      formData.append('imageGallery', "");
    }

    try {
      data.imageGalleryUploads.forEach((file) => {
        formData.append('imageGalleryUploads', file);
      }); // check if file is empty
    } catch (error) {
      formData.append('imageGalleryUploads', new Blob());
    }

    return axiosClient({
      method: 'put',
      url: `/admin/village-media`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  
  updateOurStoryInformation: (data: InformationAdminRequestDto): Promise<InformationAdminRequestDto> => {

    console.log(data);
    const formData = new FormData();
    formData.append('id', Number(data.id).toString());
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('type', data.type);

    try {
      data.newImages.forEach((file) => {
        formData.append('newImages', file);
      });
    } catch (error) {
      formData.append('newImages', new Blob());
    }

    return axiosClient({
      method: 'patch',
      url: `/admin/village/information`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateStayServiceInformation: (data: InformationAdminRequestDto): Promise<InformationAdminRequestDto> => {
    const formData = new FormData();
    formData.append('id', Number(data.id).toString());
    formData.append('title', data.title);
    formData.append('totalVisitedCustomer', Number(data.totalVisitedCustomer).toString());
    formData.append('totalVisitor', Number(data.totalVisitor).toString());
    formData.append('description', data.description);
    formData.append('type', data.type);

    try {
      data.newImages.forEach((file) => {
        formData.append('newImages', file);
      });
    } catch (error) {
      formData.append('newImages', new Blob());
    }

    return axiosClient({
      method: 'patch',
      url: `/admin/village/information`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateCultureInformation: (data: IVillageInformationResponse): Promise<IVillageInformationResponse> => {
    const formData = new FormData();
    formData.append('id', Number(data.id).toString());
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('type', data.type);



    if (data.oldImages.length > 0) {
      data.oldImages.forEach((media, index) => {
        formData.append(`oldImages[${index}].id`, Number(media.id).toString());
        formData.append(`oldImages[${index}].fileName`, media.fileName);
        formData.append(`oldImages[${index}].filePath`, media.filePath);
        formData.append(`oldImages[${index}].type`, media.type);
      });
    } else {
      formData.append('oldImages', "");
    }

    try {
      data.newImages.forEach((file) => {
        formData.append('newImages', file);
      });
    } catch (error) {
      formData.append('newImages', new Blob());
    }

    return axiosClient({
      method: 'patch',
      url: `/admin/village/information`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateServiceAndLocalProduct: (data: InformationAdminRequestDto): Promise<InformationAdminRequestDto> => {
    const formData = new FormData();
    formData.append('id', Number(data.id).toString());
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('type', data.type);

    return axiosClient({
      method: 'patch',
      url: `/admin/village/information`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateOurValue: (data: InformationAdminRequestDto): Promise<InformationAdminRequestDto> => {
    const formData = new FormData();
    formData.append('id', Number(data.id).toString());
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('type', data.type);

    return axiosClient({
      method: 'patch',
      url: `/admin/village/information`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

}

export default villageInformationApi;