
export interface IVillageInformationsResponse {
    villageInformation: IVillageInformationResponse[]
}

export interface IVillageInformationResponse {
    id: number,
    title: string,
    description: string,
    totalVisitedCustomer: number,
    totalVisitor: number,
    type: string,
    oldImages: IImageVillageInformation[];
    newImages: File[];
}

export interface IImageVillageInformation {
    id: number,
    fileName: string,
    filePath: string,
    type: string
}

export interface ILibraryVillage {
    imageHomeMain: imageHomeMain[],
    imageHomeMainUpload: File[],
    imageHomeSub: imageHomeSub[],
    imageHomeSubUploads: File[],
    imageGallery: imageGallery[],
    imageGalleryUploads: File[],
}



export interface imageHomeMain {
    id: number,
    fileName: string,
    filePath: string,
    type: string
    position: string
}

export interface imageHomeSub {
    id: number,
    fileName: string,
    filePath: string,
    type: string
    position: string
}

export interface imageGallery {
    id: number,
    fileName: string,
    filePath: string,
    type: string
    position: string
}

export interface InformationAdminRequestDto {
    id: number,
    title: string,
    description: string;
    totalVisitedCustomer: number;
    totalVisitor: number;
    type: string;
    oldImages: IImageVillageInformation[];
    newImages: File[];
}

