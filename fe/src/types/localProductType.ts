export interface IlocalProductListForAdminResponse {
    localProductListForAdmin: IlocalProductListForAdmin[];
}

export interface IlocalProductListForAdmin {
    id: number,
    productName: string,
    type: string,
    productDescription: string,
    unit: string,
    status: string,
    lowestPrice: number,
    highestPrice: number,
    villageMedias: IvillageMedias[]

}


export interface LocalProductType {
    id: number;
    productName: string;
    productDescription: string;
    unit: string;
    type: string;
    lowestPrice: number;
    highestPrice: number;
    villageMedias: VillageMedias[];
}

export interface CustomerLocalProductType {
    localProductListForCustomer: LocalProductType[];
}

export interface LocalProductDetailType {
    id: number;
    productName: string;
    productDescription: string;
    type: string;
    lowestPrice: number;
    highestPrice: number;
    villageMedias: VillageMedias[];
}

export interface VillageMedias {
    id: number;
    fileName: string;
    filePath: string;
    type: string;
    position: string;
}
export interface IvillageMedias {
    id: number,
    fileName: string,
    filePath: string,
    type: string,
    position: string,
}

export interface IEditlocalProductListForAdmin {
    localProductId: number,
    localProductName: string,
    localProductType: string,
    localProductDescription: string,
    localProductUnit: string,
    localProductMinPrice: number,
    localProductMaxPrice: number,
    villageMedias: IvillageMedias[]
    localProductTypes: string[],
    imagesFile: File[],
}

export interface IListTypeLocalProduct {
    localProductTypeList: string[]
}

export interface ILocalProductList {
    localProductTop5DetailForAdmins: localProductTop5DetailForAdmins[];
    localProductPositionList: string[];
    localProductListForAdmin: localProductListForAdmin[];
}
export interface localProductListForAdmin {
    localProductId: number,
    localProductName: string
}

export interface localProductTop5DetailForAdmins {
    localProductPosition: string,
    localProductId: number,
    localProductName: string,
    type: string
}

export interface IdAndPositionlocalProductTop {
    localProductPosition: string|undefined,
    localProductId: number|undefined,
}
