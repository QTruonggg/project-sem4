import { HomeType } from "@/types/homeType"
import axiosClient from "./axiosClient"

const homeApi = {
    getHome: (): Promise<HomeType> => {
        return axiosClient.get("/home")
    }

}

export default homeApi