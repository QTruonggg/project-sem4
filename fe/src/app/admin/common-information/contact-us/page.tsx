'use client';
import LoadingPage from '@/Components/common/LoadingPage';
import contactUsApi from '@/api/contactUsApi';
import { IContactUsAdminResponse, IContactUssAdminResponse } from '@/types/contactUsType';
import { Col, Row, message } from 'antd';
import * as React from 'react';
import { Form, SubmitHandler, useForm } from 'react-hook-form';


export interface IContactUsManagementProps {
}
export default function ContactUsManagement(props: IContactUsManagementProps) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [listContactUs, setListContactUs] = React.useState<IContactUsAdminResponse[]>([]);
    const [contactUs, setContactUs] = React.useState<IContactUsAdminResponse>();

    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setLoading(true);
        contactUsApi.getContactUsByAdmin().then((res) => {
            setContactUs(res.contactUs[0]);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IContactUsAdminResponse>({
        defaultValues: contactUs,
    });


    const onSubmit: SubmitHandler<IContactUsAdminResponse> = async (data) => {
        const dataResponse: IContactUsAdminResponse = {
            ...data,
            id: contactUs?.id,
        };
        try {
            setLoading(true);
            await contactUsApi.updateContactUsByAdmin(dataResponse);
            const updatedList = await contactUsApi.getContactUsByAdmin();
            setContactUs(updatedList.contactUs[0]);
            setIsEditing(false);
            message.success('Cập nhật thành công');
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {loading && <LoadingPage />}
            <div className='px-8 pt-5'>
                <p className='text-2xl font-semibold'>Thông tin liên hệ</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='ml-8 mr-8 mt-5 pt-3 pb-3 border px-5 rounded-lg'>
                    <Row>
                        <Col span={18} push={6}>
                            {
                                isEditing ? (
                                    <div className="relative w-full py-2">
                                        <input type="text"
                                            id='phone'
                                            defaultValue={contactUs?.phone}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            {...register('phone')}
                                        />
                                    </div>
                                ) : (
                                    <p className='py-4'>{contactUs?.phone}</p>

                                )
                            }
                        </Col>
                        <Col span={6} pull={18}>
                            <p className='font-semibold py-4'>Số điện thoại </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={18} push={6}>
                            {
                                isEditing ? (
                                    <div className="relative w-full py-2">
                                        <input type="text"
                                            id='email'
                                            defaultValue={contactUs?.email}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            {...register('email')}
                                        />
                                    </div>
                                ) : (
                                    <p className='py-4'>{contactUs?.email}</p>
                                )
                            }
                        </Col>
                        <Col span={6} pull={18}>
                            <p className='font-semibold py-4'>Địa chỉ email</p>

                        </Col>
                    </Row>

                    <Row>
                        <Col span={18} push={6}>
                            {
                                isEditing ? (
                                    <div className="relative w-full py-2">
                                        <input type="text"
                                            id='address'
                                            defaultValue={contactUs?.address}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            {...register('address')}
                                        />
                                    </div>
                                ) : (
                                    <p className='py-4'>{contactUs?.address}</p>
                                )
                            }
                        </Col>
                        <Col span={6} pull={18}>
                            <p className='font-semibold py-4'>Địa chỉ</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={18} push={6}>
                            {
                                isEditing ? (
                                    <div className="relative w-full py-2">
                                        <input type="text"
                                            id='liveChat'
                                            defaultValue={contactUs?.liveChat}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            {...register('liveChat')}
                                        />
                                    </div>
                                ) : (
                                    <p className='py-4'>{contactUs?.liveChat}</p>
                                )
                            }
                        </Col>
                        <Col span={6} pull={18}>
                            <p className='font-semibold py-4'>Link facebook</p>
                        </Col>
                    </Row>
                    <div className='flex justify-end pt-3'>
                        {
                            isEditing ? (
                                <div className='flex'>
                                    <button
                                        onClick={() => setIsEditing(false)}
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
                                    onClick={handleEditClick}
                                    className='bg-[#52C41A] hover:bg-green-600 text-white py-2 px-4 rounded'>
                                    Cập nhật
                                </button>
                            )
                        }

                    </div>

                </div>
            </form>
        </>
    );
}