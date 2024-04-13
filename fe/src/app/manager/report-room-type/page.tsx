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
import { IAdminReport, IManagerRoomTypeReport } from '@/types/reportType';
import LoadingPage from '@/Components/common/LoadingPage';
import Pagination from '@/Components/booking/Pagination';

export interface IReportRoomTypeProps {
}

export default function ReportRoomType(props: IReportRoomTypeProps) {
    const { RangePicker } = DatePicker;
    const [loading, setLoading] = React.useState(false);
    const [reportData, setReportData] = React.useState<IManagerRoomTypeReport>();
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
    const currentData = reportData?.roomTypeReportListForManager.slice(startIndex, endIndex);

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
        reportApi.getManagerRoomTypeReport(checkInDate as string, checkOutDate as string).then((res) => {
            setReportData(res);
            console.log(res);
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
            'BÁO CÁO LƯỢT KHÁCH LƯU TRÚ VÀ DOANH THU THEO HOMESTAY VÀ LOẠI PHÒNG'
          ],
          [ '',
            'Từ ngày - Đến ngày: ', // Dòng chứa thông tin ngày tháng
            `${checkInDate} đến ${checkOutDate}`, // Ngày tháng từ state của component
          ],
          [
            '#',
            'Homestay',
            'Loại phòng',
            'Số phòng',
            'Số chỗ',
            'Số lượt khách lưu trú (khách)',
            'Số lượt khách lưu trú theo ngày(khách)',
            'Tổng doanh thu (VNĐ)',
          ],
          ...data.map((report: any, index: number) => [
            index + 1,
            report.homestayCode,
            report.roomTypeName,
            report.totalRoom,
            report.totalDormSlot,
            report.totalCustomer,
            report.totalCustomerByDay,
            convertPrice(report.totalRevenue),
          ]),
        ]);
        const wscols = [
            { wch: 5 },
            { wch: 20 },
            { wch: 25 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 15 },
            { wch: 20 },
        ];
        worksheet['!cols'] = wscols;
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, filename + '.xlsx');
      };

      const handleExportExcel = () => {
        const exportData = reportData?.roomTypeReportListForManager || [];
        exportToExcel(exportData, 'Báo cáo lượt khách lưu trú và doanh thu theo homestay và loại phòng');
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
            <div className='grid grid-cols-8 text-sm mb-10'>
                <p className='col-span-4 pr-8 font-bold text-2xl'>
                    BÁO CÁO LƯỢT KHÁCH LƯU TRÚ VÀ DOANH THU THEO HOMESTAY VÀ LOẠI PHÒNG
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
                                Homestay
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Loại phòng
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số phòng
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số chỗ
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số lượt khách lưu trú (khách)
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số lượt khách lưu trú theo ngày(khách)
                            </th>
                            <th scope="col" className="px-2 py-2 max-w-fit bg-gray-300 text-center">
                                Tổng doanh thu (VNĐ)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!reportData?.roomTypeReportListForManager ? (
                            <tr>
                                <td colSpan={8} className="text-center text-xl py-2">
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
                                        {report.homestayCode}
                                    </td>
                                    <td className="border text-center border-gray-300 px-2 py-2">
                                        {report.roomTypeName}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.totalRoom}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.totalDormSlot}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.totalCustomer}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.totalCustomerByDay}
                                    </td>
                                    <td className="border font-bold border-gray-300 px-2 py-2">
                                        {convertPrice(report.totalRevenue)}
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
                    totalItems={reportData?.roomTypeReportListForManager.length || 0}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>

        </div >
    );
}
