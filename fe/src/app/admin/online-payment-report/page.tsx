'use client';
import * as React from 'react';
import { DatePicker } from 'antd';
import 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import viVN from 'antd/es/date-picker/locale/vi_VN';
import { faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reportApi from '@/api/reportApi';
import { IAdminReport, IHouseholdRevenueReport } from '@/types/reportType';
import LoadingPage from '@/Components/common/LoadingPage';
import Pagination from '@/Components/booking/Pagination';

export interface IReportProps {
}

export default function Report(props: IReportProps) {
    const { RangePicker } = DatePicker;
    const [loading, setLoading] = React.useState(false);
    const [reportData, setReportData] = React.useState<IHouseholdRevenueReport>();
    const [checkInDate, setCheckInDate] = React.useState<string>();
    const [checkOutDate, setCheckOutDate] = React.useState<string>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const dateFormat = 'DD/MM/YYYY';
    const today = dayjs().startOf('day');

    const disabledDate = (current: any) => {
        return current && current > today;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = reportData?.list.slice(startIndex, endIndex);

    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        const checkInDateString = convertDateFormat(dateStrings[0] as string);
        const checkOutDateString = convertDateFormat(dateStrings[1] as string);

        setCheckInDate(checkInDateString);
        setCheckOutDate(checkOutDateString);

        const checkInDate = dayjs(checkInDateString);
        const checkOutDate = dayjs(checkOutDateString);

        // Kiểm tra nếu ngày checkOutDate trước hoặc bằng ngày checkInDate, thì tăng ngày checkOutDate lên 1 ngày
        if (checkOutDate.isSame(checkInDate) || checkOutDate.isBefore(checkInDate)) {
            setCheckOutDate(checkInDate.clone().add(1, 'day').format('YYYY-MM-DD'));
        }
    };

    const convertDateFormat = (dateString: string) => {
        if (typeof dateString == "string" && dateString.indexOf('/') > -1) {
            const parts = dateString.split('/');
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            return `${year}-${month}-${day}`;
        } else {
            return dateString;
        }
    }

    const getReport = () => {
        setLoading(true);
        reportApi.getHouseholdRevenueReport(checkInDate as string, checkOutDate as string).then((res) => {
            setReportData(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        }
        )
    }

    const exportToExcel = (data: any, filename: string) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
            [
                'BÁO CÁO TỔNG DOANH THU QUA CỔNG THANH TOÁN TRỰC TUYẾN'
            ],
            ['',
                'Từ ngày - Đến ngày: ', // Dòng chứa thông tin ngày tháng
                `${checkInDate} đến ${checkOutDate}`, // Ngày tháng từ state của component
            ],
            [
                '#',
                'Hộ kinh doanh',
                'Chủ hộ',
                'Email',
                'Số điện thoại',
                'Tổng doanh thu (VNĐ)',
                'Ghi chú',
            ],
            ...data.map((report: any, index: number) => [
                index + 1,
                report.householdName,
                report.managerName,
                report.managerEmail,
                report.managerPhone,
                convertPrice(report.totalRevenue),
                '',
            ]),
        ]);
        const wscols = [
            { wch: 5 },
            { wch: 20 },
            { wch: 27 },
            { wch: 20 },
            { wch: 15 },
            { wch: 20 },
        ];
        worksheet['!cols'] = wscols;
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, filename + '.xlsx');
    };

    const handleExportExcel = () => {
        const exportData = reportData?.list || [];
        exportToExcel(exportData, 'Báo cáo tổng doanh thu qua cổng thanh toán trực tuyến');
    };
    const convertPrice = (num: number | undefined) => {
        if (typeof num === 'undefined') {
            return '';
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    return (
        <div className='w-11/12 mx-auto my-5'>
            {loading && <LoadingPage />}
            <div className='grid grid-cols-8 mb-10 text-sm'>
                <p className='col-span-4 pr-8 font-bold text-2xl'>
                    BÁO CÁO TỔNG DOANH THU QUA CỔNG THANH TOÁN TRỰC TUYẾN
                </p>
                <div className='col-span-3 rounded flex items-end'>
                    <div className="relative mr-4">
                        <label
                            htmlFor="Date"
                            className="block absolute text-sm z-20 -top-3 left-3 bg-white px-2 text-gray-500">
                            Từ ngày - Đến ngày
                        </label>
                        <RangePicker
                            format={dateFormat}
                            className="w-full py-2 h-full rounded"
                            disabledDate={disabledDate}
                            id='Date'
                            locale={viVN}
                            onChange={handleDateChange}
                        />
                    </div>
                    <button
                        onClick={getReport}
                        {...(checkInDate && checkOutDate) ? {} : { disabled: true }}
                        className={`py-2 px-4  ${(checkInDate && checkOutDate) ? 'bg-blue-500 hover:bg-opacity-60 text-white' : 'bg-gray-400/50 cursor-not-allowed'} w-fit rounded `}>
                        Xuất báo cáo
                    </button>
                </div>

                <div className='col-span-1 flex items-end'>
                    <button
                        onClick={handleExportExcel}
                        {...(reportData) ? {} : { disabled: true }}
                        className={`py-2 px-4 border-2 ${(reportData) ? 'hover:border-black' : 'cursor-not-allowed'} border-gray-300 w-fit rounded`} >
                        File Excel <FontAwesomeIcon icon={faDownload} />
                    </button>
                </div>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-gray-300 mb-3">

                <table className="w-full text-sm">
                    <thead className=" text-gray-700 bg-white">
                        <tr>
                            <th scope="col" className="px-2 py-2  bg-gray-300 text-center">
                                #
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Hộ kinh doanh
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Chủ hộ
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Email
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số điện thoại
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Tổng doanh thu (VNĐ)
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Ghi chú
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!reportData?.list ? (
                            <tr>
                                <td colSpan={10} className="text-center text-xl py-2">
                                    Vui lòng chọn ngày tháng để xuất báo cáo
                                </td>
                            </tr>

                        ) : (
                            currentData?.map((report, index) => (
                                <tr key={index} className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700">

                                    <th scope="row" className="border border-gray-300 px-2 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="border border-gray-300 px-2  py-2">
                                        {report.householdName}
                                    </td>
                                    <td className="border text-center border-gray-300 px-2 py-2">
                                        {report.managerName}
                                    </td>
                                    <td className="border text-center border-gray-300 px-2 py-2">
                                        {report.managerEmail}
                                    </td>
                                    <td className="border text-center border-gray-300 px-2 py-2">
                                        {report.managerPhone}
                                    </td>
                                    <td className="border text-center border-gray-300 px-2 py-2">
                                        {report.totalRevenue}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                    </td>
                                </tr>
                            )))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center text-center mb-8">
                <Pagination
                    currentPage={currentPage}
                    totalItems={reportData?.list.length || 0}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>

        </div >
    );
}
