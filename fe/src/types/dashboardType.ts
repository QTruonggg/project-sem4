export interface IGetAllRoomResponse {
  countHomestay: number;
  roomListForManager: IRoomInformation[];
}

export interface IRoomInformation {
  id: number;
  capacity: number;
  homestayCode: string;
  roomName: string;
  roomTypeName: string;
  price: number;
  roomStatus: string;
}

export interface IGetRoomInformationToAdd {
  roomNameList: string[],
  roomType: roomType[],
  homestay: Homestay[]
}

export interface responseRoomInformation {
  roomNameList: string[],
  householdRoomTypeId: number,
  homestayId: number,
  
}


export interface Homestay {
  id: number,
  homestayCode: string,
  homestayAddress: string,
}


export interface roomType {
  id: number,
  roomTypeName: string,
  singleBed: number,
  doubleBed: number,
  price: number,
  capacity: number,
}

export interface roomDetail {
  householdId: number,
  roomId: number,
  homestayCode: string,
  roomName: string,
  roomTypeName: string,
  price: number,
  capacity: number,
  roomStatus: string,
  singleBed: number,
  doubleBed: number,
  isChildrenAndBed: boolean,
  facilities: IroomFacilities[],
  homestayMedias: IroomMedia[],
  totalDormSlot: number,
  dorm: boolean
}

export interface IroomMedia {
  id: number,
  filePath: string,
}

export interface IroomFacilities {
  id: number,
  facilityId: number,
  facilityName: string
}

export interface IGetAllHomestayResponse {
  totalHomestay: number;
  homestayListForManager: IhomestayManagerList[];
}

export interface IhomestayManagerList {
  homestayId: number;
  homestayCode: string;
  totalRoom: number;
  totalDorm: number;
  homestayStatus: string;
  address: string;
  homestayMediaList: homestayMediaList[];
  imagesFile: File[];
}

export interface homestayMediaList {
  id: string;
  fileName: string;
  filePath: string;
  type: string;
  status: string;
}

export interface homestayMedia {
  id: number;
  fileName: string;
  filePath: string;
  type: string;
}

export interface IGetAllRoomResponse {
  totalRoom: number;
  homestayInformationForManagerList: IhomestayManagerList[];
}

export interface IGetAllRoomTypeResponse {
  householdRoomTypeListForManager: IhouseholdRoomTypeResponseDtos[];
}

export interface IhouseholdRoomTypeResponseDtos {
  householdRoomTypeId: number;
  roomTypeName: string;
  capacity: number;
  price: number;
  priceUpdate: number;
  singleBed: number;
  doubleBed: number;
  facilities: Facility[];
  homestayMedias: HomestayMedia[];
  facilityVillageList: Facility[];
  isChildrenAndBed: boolean;
  imageFiles: File[];
  status: string;
}

export interface HomestayMedia {
  id: number;
  fileName: string
  filePath: string;
  type: string;
}

export interface Facility {
  id: number;
  facilityId: number;
  facilityName: string;
  status?: boolean;
}

export interface HomestayMedia {
  id: number;
  fileName: string;
  filePath: string;
  type: string;
}

export interface IGetAllDormResponse {
  dormListForManager: dormInformationResponseDtoList[];
}

export interface dormInformationResponseDtoList {
  roomId: number,
  homestayCode: string,
  price: number,
  roomName: string,
  totalDormSlot: number,
  roomStatus: string
}

export interface dormEditDto {
  roomId: number,
  numberOfSlots: number,
}

export interface IGetRoomTypeToAdd {
  roomTypes: roomTypes[],
  priceUpdate: null,
  capacity: number,
  isChildrenAndBed: boolean,
  facilities: facilities[],
  mediaFiles: File[],
}

export interface facilities {
  id: number,
  facilityId: number,
  facilityName: string,

}

export interface roomTypes {
  id: number,
  roomTypeName: string,
  singleBed: number,
  doubleBed: number
}

export interface Passenger {
  name: string,
}

export interface GetAllHouseholManager {
  id: number,
  householdName: string,
  checkInTime: string,
  checkOutTime: string,
  cancellationPeriod: string,
  phoneNumberFirst: string,
  phoneNumberSecond: string,
  email: string,
  linkFacebook: string,
  linkTiktok: string,
  description: string,
  avatar: string,
  coverImage: string,
  linkYoutube: string,
}


export interface IGetDropDownBookingResponse {
  homestays: dropdownHomestay[];
}

export interface dropdownHomestay {
  homestayId: number,
  homestayCode: string,
}

export interface searchRoomEmptyResponse {
  rooms: room[]
}

export interface room {
  homestayId: number,
  homestayName: string,
  householdRoomTypeId: number,
  householdRoomTypeName: string,
  totalSlotDefault: number,
  totalSlotSelected: number,
  roomId: number,
  roomName: string,
  capacity: number,
  singleBed: number,
  doubleBed: number,
  price: number,
  isDorm: boolean,
}
