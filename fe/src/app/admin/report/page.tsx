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
import { IAdminReport } from '@/types/reportType';
import LoadingPage from '@/Components/common/LoadingPage';
import Pagination from '@/Components/booking/Pagination';

export interface IReportProps {
}

export default function Report(props: IReportProps) {
    const { RangePicker } = DatePicker;
    const [loading, setLoading] = React.useState(false);
    const [reportData, setReportData] = React.useState<IAdminReport>();
    const [sumTotalCustomer, setSumTotalCustomer] = React.useState<number>(0);
    const [sumTotalRevenue, setSumTotalRevenue] = React.useState<number>(0);
    const [sumTotalCustomerByDay, setSumTotalCustomerByDay] = React.useState<number>(0);
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
    const currentData = reportData?.reportDetailListForAdmin.slice(startIndex, endIndex);

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
        reportApi.getAdminReport(checkInDate as string, checkOutDate as string).then((res) => {
            setReportData(res);
            let sumTotalCustomer = 0;
            let sumTotalRevenue = 0;
            let sumTotalCustomerByDay = 0;
            res.reportDetailListForAdmin?.forEach((report) => {
                sumTotalCustomer += report.totalCustomer;
                sumTotalRevenue += report.totalRevenue;
                sumTotalCustomerByDay += report.totalCustomerByDay;
            })
            setSumTotalCustomer(sumTotalCustomer);
            setSumTotalRevenue(sumTotalRevenue);
            setSumTotalCustomerByDay(sumTotalCustomerByDay);
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
            'BÁO CÁO LƯỢT KHÁCH LƯU TRÚ VÀ TỔNG DOANH THU TỪNG HỘ KINH DOANH'
          ],
          [ '',
            'Từ ngày - Đến ngày: ', // Dòng chứa thông tin ngày tháng
            `${checkInDate} đến ${checkOutDate}`, // Ngày tháng từ state của component
          ],
          [
            '#',
            'Hộ kinh doanh',
            'Chủ hộ',
            'Homestay',
            'Số lượng homestay',
            'Sức chứa tối đa',
            'Số lượt khách lưu trú',
            'Số lượt khách lưu trú theo ngày',
            'Tổng doanh thu (VNĐ)',
            'Ghi chú',
          ],
          ...data.map((report: any, index: number) => [
            index + 1,
            report.householdName,
            report.managerName,
            getStringHomestayName(report.homeStayName),
            report.homeStayName.length,
            report.totalCapacity,
            report.totalCustomer,
            report.totalCustomerByDay,
            convertPrice(report.totalRevenue),
            '',
          ]),
        ]);
        const wscols = [
            { wch: 5 },
            { wch: 20 },
            { wch: 25 },
            { wch: 20 },
            { wch: 17 },
            { wch: 15 },
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
        const exportData = reportData?.reportDetailListForAdmin || [];
        exportToExcel(exportData, 'Báo cáo lượt khách lưu trú và tổng doanh thu từng hộ kinh doanh');
    };



    const getStringHomestayName = (homestayName: string[]) => {
        let result = "";
        result = homestayName[0];
        for (let i = 1; i < homestayName.length; i++) {
            result = result + " - " + homestayName[i];
        }
        return result;
    }

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
                    BÁO CÁO LƯỢT KHÁCH LƯU TRÚ VÀ TỔNG DOANH THU TỪNG HỘ KINH DOANH
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
                                Homestay
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số lượng homestay
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Sức chứa tối đa (khách)
                            </th>
                            <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                                Số lượt khách lưu trú (lượt)
                            </th>
                            <th scope="col" className="px-2 py-2 max-w-fit bg-gray-300 text-center">
                                Số lượt khách lưu trú theo ngày (lượt)
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
                        {!reportData?.reportDetailListForAdmin ? (
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
                                    <td className="border border-gray-300 px-2 py-2">
                                        {getStringHomestayName(report.homeStayName)}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.homeStayName.length}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.totalCapacity}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.totalCustomer}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {report.totalCustomerByDay}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-2">
                                        {convertPrice(report.totalRevenue)}
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
                    totalItems={reportData?.reportDetailListForAdmin.length || 0}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>


            <div className='grid grid-cols-11 gap-5'>
                <p className='col-span-2 font-bold text-center text-2xl'>
                    BÁO CÁO CỦA CẢ V-HOMESTAY
                </p>
                <div className='col-span-9 grid grid-cols-3 gap-5'>
                    <div className='w-full p-2 border border-black rounded-xl text-center uppercase'>
                        <p className='underline mb-3 font-bold'>số lượt khách lưu trú</p>
                        <p className='text-2xl font-black'>{convertPrice(sumTotalCustomer)}</p>
                        <p className='text-2xl'>lượt khách</p>
                    </div>
                    <div className='w-full p-2 border border-black rounded-xl text-center uppercase'>
                        <p className='underline mb-3 font-bold'>LƯƠT KHÁCH LƯU TRÚ THEO NGÀY</p>
                        <p className='text-2xl font-black'>{convertPrice(sumTotalCustomerByDay)}</p>
                        <p className='text-2xl'>lượt khách</p>
                    </div>
                    <div className='w-full p-2 border border-black rounded-xl text-center uppercase'>
                        <p className='underline mb-3 font-bold'>tổng doanh thu</p>
                        <p className='text-2xl font-black'>{convertPrice(sumTotalRevenue)}</p>
                        <p className='text-2xl'>VNĐ</p>
                    </div>
                </div>
            </div>

        </div >
    );
}
