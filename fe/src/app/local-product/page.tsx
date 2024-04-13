'use client';
import Pagination from '@/Components/booking/Pagination';
import LoadingPage from '@/Components/common/LoadingPage';
import LocalProductItem from '@/Components/local-product/LocalProductItem';
import localProductApi from '@/api/localProductApi';
import { CustomerLocalProductType, LocalProductType } from '@/types/localProductType';
import * as React from 'react';

export interface ILocalProductProps {
}

export default function LocalProduct(props: ILocalProductProps) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<CustomerLocalProductType>();
    const [currentPage, setCurrentPage] = React.useState(1);

    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = products?.localProductListForCustomer?.slice(startIndex, endIndex);

    React.useEffect(() => {
        setLoading(true);
        const response = localProductApi.getCustomerLocalProductList();
        response.then((res) => {
            setProducts(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <>
            {loading && <LoadingPage />}
            <div className='w-2/3 mx-auto'>
                <div className=' flex items-center justify-center my-14'>
                    <div className="flex-1 h-[1px] bg-gray-500"></div>
                    <div className="text-3xl text-center font-bold px-16">
                        <p>Sản vật & đặc sản</p>
                        <p>núi rừng Đông Bắc</p>
                    </div>
                    <div className="flex-1 h-[1px] bg-gray-500"></div>
                </div>

                <p className='text-gray-600 text-center'>Vui lòng mua trực tiếp tại V-HomeStay hoặc liên hệ hotline <span className='font-bold'>0987.654.321</span>, nhắn tin qua fanpage <span className='font-bold'>V-HomeStay Mèo Vạc</span> để đặt hàng online.</p>

            </div>

            <div className='w-3/4 mx-auto grid grid-cols-4 gap-5 my-10'>
                {!products?.localProductListForCustomer ? (
                    <p className='font-bold text-2xl col-span-full text-center'>Không có dữ liệu để hiển thị</p>
                ) : (
                    currentData?.map((product) => (
                        <LocalProductItem product={product} key={product.id} />
                    ))
                )}
                <div className="flex col-span-full justify-center text-center mb-8">

                    <Pagination
                        currentPage={currentPage}
                        totalItems={products?.localProductListForCustomer?.length || 0}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
}
