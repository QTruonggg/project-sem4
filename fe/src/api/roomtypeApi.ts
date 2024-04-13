import { IRoomTypeAdminResponse, IRoomTypesAdminResponse } from '@/types/roomTypeType';
import axiosClient from './axiosClient';
import {
  IGetAllRoomTypeResponse,
  IGetRoomTypeToAdd,
  IhouseholdRoomTypeResponseDtos,
} from '@/types/dashboardType';
import { IMessagesResponse } from '@/types/apiReturnType';

const roomtypeApi = {
  getAllRoomType: (): Promise<IGetAllRoomTypeResponse> => {
    return axiosClient.get(`manager/room-type`);
  },
  getDetailRoomType: (id: string): Promise<IhouseholdRoomTypeResponseDtos> => {
    return axiosClient.get(`manager/room-type/` + id + '/form-data');
  },
  getRoomTypesAdmin: (): Promise<IRoomTypesAdminResponse> => {
    return axiosClient.get(`admin/room-types`);
  },
  getRoomTypeFormUpdateAdmin: (roomtypeId: number): Promise<IRoomTypeAdminResponse> => {
    return axiosClient.get(`admin/room-types/${roomtypeId}/form-update`);
  },
  updateRoomTypeByAdmin: async (data: IRoomTypeAdminResponse) : Promise<IMessagesResponse> => {
    console.log(data)
    let token = sessionStorage.getItem('access_token');

    return await axiosClient({
      method: 'PUT',
      data: data,
      url: `/admin/room-types`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },

    });
  },
  createRoomTypeByAdmin: async (data: IRoomTypeAdminResponse) : Promise<IMessagesResponse> => {
    console.log(data)
    let token = sessionStorage.getItem('access_token');

    return await axiosClient({
      method: 'POST',
      data: data,
      url: `/admin/room-types`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },

    });
  },

  editDetailRoomType: async (data: IhouseholdRoomTypeResponseDtos, id: string): Promise<IhouseholdRoomTypeResponseDtos> => {

    try {
      const formData = new FormData();

      formData.append('householdRoomTypeId', Number(data.householdRoomTypeId).toString());
      formData.append('roomTypeName', data.roomTypeName);
      formData.append('capacity', Number(data.capacity).toString());
      formData.append('price', Number(data.price).toString());
      formData.append('priceUpdate', Number(data.priceUpdate).toString());
      formData.append('singleBed', Number(data.singleBed).toString());
      formData.append('doubleBed', Number(data.doubleBed).toString());

      // Đặt danh sách facilities

      data.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}].id`, Number(facility.id).toString());
        formData.append(`facilities[${index}].facilityId`, Number(facility.facilityId).toString());
        formData.append(`facilities[${index}].facilityName`, facility.facilityName);
      });

      // Đặt danh sách homestayMedias
      if (data.homestayMedias.length > 0) {
        data.homestayMedias.forEach((media, index) => {
          formData.append(`homestayMedias[${index}].id`, Number(media.id).toString());
          formData.append(`homestayMedias[${index}].fileName`, media.fileName);
          formData.append(`homestayMedias[${index}].filePath`, media.filePath);
          formData.append(`homestayMedias[${index}].type`, media.type);
        });
      } else {
        formData.append('homestayMedias', "");
      }
      try {
        data.imageFiles.forEach((file) => {
          formData.append('imageFiles', file);
        }); // check if file is empty
      } catch (error) {
        formData.append('imageFiles', new Blob());
      }

      // Đặt danh sách facilityVillageList
      data.facilityVillageList.forEach((facility, index) => {
        formData.append(`facilityVillageList[${index}].id`, Number(facility.id).toString());
        formData.append(`facilityVillageList[${index}].facilityId`, Number(facility.facilityId).toString());
        formData.append(`facilityVillageList[${index}].facilityName`, facility.facilityName);
      });

      formData.append('status', String(data.status));
      formData.append('isChildrenAndBed', Boolean(data.isChildrenAndBed).toString());

      console.log('Call api  ' + data.isChildrenAndBed);

      const response = await axiosClient({
        method: 'put',
        url: `/manager/room-type/${id}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        roomtypeApi.getDetailRoomType(id);

      }

      return response.data;
    } catch (error) {
      console.error('Error editing room type:', error);
      throw error;
    }
  },
  deleteRoomType: async (id: number): Promise<IhouseholdRoomTypeResponseDtos> => {
    let token = localStorage.getItem('access_token');
    try {
      const response = await axiosClient({
        method: 'DELETE',
        url: `/manager/room-type/${id}`,
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
  getRoomTypeToAdd: (): Promise<IGetRoomTypeToAdd> => {
    return axiosClient.get(`manager/room-type/form-data`);
  },

  addRoomType: async (data: IGetRoomTypeToAdd): Promise<IGetRoomTypeToAdd> => {
    const formData = new FormData();
    data.roomTypes.forEach((roomType, index) => {
      formData.append(`roomTypes[${index}].id`, Number(roomType.id).toString());
      formData.append(`roomTypes[${index}].roomTypeName`, roomType.roomTypeName);
      formData.append(`roomTypes[${index}].singleBed`, Number(roomType.singleBed).toString());
      formData.append(`roomTypes[${index}].doubleBed`, Number(roomType.doubleBed).toString());
    });

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}].id`, Number(facility.id).toString());
      formData.append(`facilities[${index}].facilityId`, Number(facility.facilityId).toString());
      formData.append(`facilities[${index}].facilityName`, facility.facilityName);
    });

    formData.append('capacity', Number(data.capacity).toString());

    formData.append('priceUpdate', Number(data.priceUpdate).toString());
    formData.append('isChildrenAndBed', Boolean(data.isChildrenAndBed).toString());

    data.mediaFiles.forEach((file) => {
      formData.append('mediaFiles', file);
    });

    const response = await axiosClient({
      method: 'POST',
      url: `/manager/room-type`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
                        
    return response.data;
  }
};

export default roomtypeApi;
