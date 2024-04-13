
import { IHousehold } from '@/types/householdType';
import * as React from 'react';
import PopConfirm from '../user/PopConfirm';
import householdApi from '@/api/householdApi';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import FailedModal from '@/Components/CustomField/FailedModal';
import LoadingPage from '@/Components/common/LoadingPage';

export interface ITopHouseholdItemProps {
    household: IHousehold;
    index: number;
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopHouseholdItem({
    household,
    index,
    change,
    setChange
}: ITopHouseholdItemProps) {
    const [loading, setLoading] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [showFailModal, setShowFailModal] = React.useState(false);
    const handleDelete = async () => {
            setLoading(true);
            try {
                await householdApi.removeTopHousehold(household.top);
                setShowModal(true);
            } catch (error) {
                console.log(error);
                setShowFailModal(true);
            } finally {
                setLoading(false);
            }
        
    }
    return (
        <tr className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700">
            {loading && <LoadingPage />}
            <th scope="row" className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </th>
            <td className="border border-gray-300 px-2  py-2">
                {household.householdName}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {household.homestay}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {household.managerFirstName + ' ' + household.managerLastName}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                {household.managerPhoneNumber}
            </td>
            <td className="border border-gray-300 px-2 py-2">
                <p className='px-2 py-1 rounded-lg bg-blue-500 font-semibold text-white'>TOP {household.top}</p>
            </td>
            <td className="border border-gray-300 px-2 py-2">
                <button
                onClick={() => {
                    setIsDeleting(true);
                }}
                className='px-3 py-2 rounded-lg bg-red-500 hover:bg-opacity-50 font-semibold text-white'>Xóa</button>
                {isDeleting && (
                    <PopConfirm
                        title='Xóa top nổi bật'
                        onConfirm={handleDelete}
                        onCancel={() => {
                            setIsDeleting(false);
                        } } 
                        message={`Bạn có chắc muốn xóa ${household.householdName} khỏi top nổi bật không?`}                
                        />
                )}
                <SuccessModal 
                isVisible={showModal} 
                onClose={()=>{
                    setChange(!change);
                    setShowModal(false);
                }} 
                message={'Xoá thành công'}/>
                <FailedModal
                isVisible={showFailModal}
                onClose={()=>{
                    setShowFailModal(false);
                }}
                message={'Xoá thất bại'}
                />
            </td>

        </tr>
    );
}
