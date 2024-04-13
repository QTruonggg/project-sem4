import axiosClient from "./axiosClient";


const notificationApi = {
    readNotification: async (id: number): Promise<any> => {
        let token = localStorage.getItem('access_token');

        try {
            const response = await axiosClient({
                method: 'PUT',
                url: `/read-notification/${id}`,
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
}

export default notificationApi;