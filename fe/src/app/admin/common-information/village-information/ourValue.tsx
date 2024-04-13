import * as React from 'react';
import villageInformationApi from '@/api/villageInformationApi';
import { Card, Col, Row, message } from 'antd';
import { IVillageInformationResponse, InformationAdminRequestDto } from '@/types/villageInformationType';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoadingPage from '@/Components/common/LoadingPage';

export interface IOurValueProps {
    ourValueInformation: IVillageInformationResponse | undefined;
    setOurValueInformation: (value: React.SetStateAction<IVillageInformationResponse | undefined>) => void;
}

export default function OurValue({ ourValueInformation,setOurValueInformation }: IOurValueProps) {

    const [isEditingOurValue, setIsEditingOurValue] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IVillageInformationResponse>({
        defaultValues: ourValueInformation,
      });

      const onSubmit: SubmitHandler<IVillageInformationResponse> = async (data) => {
        console.log('Our value' + data.title);
        const res: InformationAdminRequestDto = {
            ...data,
            id: ourValueInformation?.id || 0,
            title: data.title || '',
            description: data.description || '',
            totalVisitedCustomer: data?.totalVisitedCustomer || 0,
            totalVisitor: data?.totalVisitor || 0,
            oldImages: data?.oldImages || [],
            newImages: [],
            type: data?.type || 'OUR_VALUE'
        }
        try {
            setLoading(true);
            await villageInformationApi.updateOurValue(res);
            const updateData = villageInformationApi.getVillageInformationsByAdmin();
            setOurValueInformation((await updateData).villageInformation[4]);
            message.success('Cập nhật giá trị của chúng tôi thành công');
            setIsEditingOurValue(false);
        } catch (error) {
            
        }finally{
            setLoading(false);
        }
       
    }

    return (
        <div>
               {loading && <LoadingPage />}
            <Card className='mb-5' title="Giá trị của chúng tôi" size="small" headStyle={{ backgroundColor: '#8DD3BB', fontSize: '15px' }}>
                {
                    ourValueInformation && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col span={18} push={6}>
                                    {
                                        isEditingOurValue ? (
                                            <div className="relative w-full py-2">
                                                <input type="text"
                                                    defaultValue={ourValueInformation.title}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    required
                                                   {...register('title')}
                                                />
                                            </div>
                                        ) : (
                                            <p className='py-2 pr-2'>{ourValueInformation.title}</p>
                                        )
                                    }
                                </Col>
                                <Col span={6} pull={18}>
                                    <p className='px-2 py-2 font-semibold'>Tiêu đề</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18} push={6}>
                                    {
                                        isEditingOurValue ? (
                                            <div className="relative w-full py-2">
                                                <textarea id="message" defaultValue={ourValueInformation.description}
                                                    rows={4}
                                                    {...register('description')}
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                </textarea>


                                            </div>
                                        ) : (
                                            <p className='py-2 pr-2'>
                                                {ourValueInformation.description}
                                            </p>
                                        )
                                    }
                                </Col>
                                <Col span={6} pull={18}>
                                    <p className='px-2 py-2 font-semibold'>Nội dung</p>
                                </Col>
                            </Row>
                            <div className='flex justify-end pb-2'>
                                {
                                    isEditingOurValue ? (
                                        <div className='flex'>
                                            <button
                                                onClick={() => setIsEditingOurValue(false)}
                                                className='bg-[#F5222D] hover:bg-red-700 text-white py-2 px-4 rounded mr-3'
                                            >
                                                Hủy cập nhật
                                            </button>
                                            <button
                                                type='submit'
                                                className='bg-[#52C41A] hover:bg-green-600 text-white py-2 px-4 rounded'>
                                                Lưu
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditingOurValue(true)}
                                            className='bg-[#8DD3BB] hover:bg-[#6AB79D] text-white font-medium py-2 px-4 rounded'>
                                            Chỉnh sửa
                                        </button>
                                    )
                                }
                            </div>
                        </form>
                    )
                }
            </Card>
        </div>
    );
}
