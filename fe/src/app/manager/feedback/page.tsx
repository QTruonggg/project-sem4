'use client'
import Pagination from '@/Components/booking/Pagination';
import LoadingPage from '@/Components/common/LoadingPage';
import FeedbackTableItem from '@/Components/my-feedback/FeedbackTableItem';
import feedbackManagerApi from '@/api/feedbackManagerApi';
import { IListFeedback } from '@/types/feedbackManagerType';
import { faBackwardStep, faRefresh, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface IFeedbackManagementProps {
}

export default function FeedbackManagement(props: IFeedbackManagementProps) {
  const [feedBackList, setFeedBackList] = React.useState<IListFeedback>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<IListFeedback>();
  const [stars, setStars] = React.useState<number[]>([]);
  const [status, setStatus] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentSearchPage, setCurrentSearchPage] = React.useState(1);
  const [change, setChange] = React.useState(false);
  const itemsPerPage = 10;
  React.useEffect(() => {
    fetchData();
    resetSearch();
  }, [change]);
  const fetchData = async () => { // Định nghĩa một hàm async để có thể sử dụng await
    try {
      setLoading(true);
      setSearchResults(undefined)
      const response = await feedbackManagerApi.getListFeedback(); // Thêm await ở đây
      console.log(response);
      setFeedBackList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearchPageChange = (page: number) => {
    setCurrentSearchPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = feedBackList?.feedbackListForManager?.slice(startIndex, endIndex);
  const currentSearchData = searchResults?.feedbackListForManager? searchResults?.feedbackListForManager.slice(startIndex, endIndex) : undefined;

  const ratingComment = (rating: number) => {
    if (rating >= 4.5) {
      return 'Rất tốt';
    } else if (rating >= 4) {
      return 'Tốt';
    } else if (rating >= 3.5) {
      return 'Khá tốt';
    } else if (rating >= 3) {
      return 'Khá';
    } else if (rating >= 2) {
      return 'Trung bình';
    } else if (rating >= 1) {
      return 'Kém';
    } else if (rating > 0) {
      return 'Tệ';
    }
    return '';
  }

  const ratingConvert = (rating: number) => {
    if (Number.isInteger(rating)) {
      return rating.toFixed(1);
    }
    return rating;
  }

  const averageRating = () => {
    let average = 0;
    let count = 0;
    feedBackList?.feedbackListForManager?.map((feedback) => {
      if (feedback.status === 'SHOWED') {
        average += feedback.rating;
        count++;
      }
    });
    if (count === 0) {
      return 0;
    }
    const roundedAverage = (average / count).toFixed(1);
    return parseFloat(roundedAverage);
  }

  const handleStarsSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const star = Number(event.target.value);
    if (event.target.checked) {
      setStars((prevStars) => [...prevStars, star]);
    } else {
      setStars((prevStars) =>
        prevStars.filter((filterStar) => filterStar !== star)
      );
    }
  };

  const handleStatusSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.value;
    if (event.target.checked) {
      setStatus((prevStatus) => [...prevStatus, status]);
    } else {
      setStatus((prevStatus) =>
        prevStatus.filter((filterStatus) => filterStatus !== status)
      );
    }
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Thêm icon ngôi sao đầy nếu i nhỏ hơn hoặc bằng rating
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const handleSearch = () => {
    if (feedBackList) {
      const filteredResults = feedBackList.feedbackListForManager.filter((feedback) => {
        const searchMatch =
          (feedback.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedback.content.toLowerCase().includes(searchQuery.toLowerCase())) || searchQuery === '';

        const starsMatch = stars.length === 0 || stars.includes(feedback.rating);

        const statusMatch = status.length === 0 || status.includes(feedback.status);

        return searchMatch && starsMatch && statusMatch;
      });

      setSearchResults({
        feedbackListForManager: filteredResults,
        averageRating: feedBackList.averageRating,
      });
    }
  };
  const resetSearch = () => {
    setStars([]);
    setStatus([]);
    setSearchQuery('');
    setSearchResults(undefined)
    // get input elements by id and set checked to false
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type === 'checkbox') {
        inputs[i].checked = false;
      } else if (inputs[i].type === 'text') {
        inputs[i].value = '';
      }
    }
    
  };
  return (
    <>
      {loading && <LoadingPage />}

      <div className="w-11/12 my-5 m-auto">
        <div className='justify-between flex items-end my-4'>

          <div className='grid grid-cols-2 gap-4 p-6 rounded-lg bg-gray-300'>
            <h1 className="col-span-2 text-center text-3xl font-bold text-gray-900">TỔNG KẾT </h1>

            <div className='col-span-1 p-4 bg-white text-center rounded-lg'>
              <p className='font-semibold'>TRUNG BÌNH SAO</p>
              <p className='font-semibold mb-3'>HIỆN TRÊN WEB</p>
              <div className='justify-center flex items-center'>
                <div className='p-3 rounded-lg bg-blue-500 text-white font-bold '>
                  {ratingConvert(averageRating())}
                </div>
                <div className=' ml-2 text-right'>
                  <div className='font-bold'>{ratingComment(feedBackList?.averageRating || 0)}</div>
                </div>
              </div>
            </div>

            <div className='col-span-1 p-4 bg-white text-center rounded-lg'>
              <p className='font-semibold'>TRUNG BÌNH SAO</p>
              <p className='font-semibold mb-3'>THỰC TẾ</p>
              <div className='justify-center flex items-center'>
                <div className='p-3 rounded-lg bg-blue-500 text-white font-bold '>
                  {ratingConvert(feedBackList?.averageRating || 0)}
                </div>
                <div className=' ml-2 text-right'>
                  <div className='font-bold'>{ratingComment(feedBackList?.averageRating || 0)}</div>
                </div>
              </div>
            </div>

          </div>


          <div className='rounded-xl border-2 border-gray-300 p-4'>
            <div className='flex justify-between'>
              <div className="flex items-center m-4" >
                <input
                  id={"SHOWED"}
                  type="checkbox"
                  value={"SHOWED"}
                  className="w-4 h-4 bg-blue-500 border-gray-300"
                  onChange={handleStatusSearchChange} />
                <label htmlFor={"SHOWED"} className="ml-2 text-lg">HIỆN TRÊN WEB</label>
              </div>
              <div className="flex items-center m-4" >
                <input
                  id={"HIDED"}
                  type="checkbox"
                  value={"HIDED"}
                  className="w-4 h-4 bg-blue-500 border-gray-300"
                  onChange={handleStatusSearchChange} />
                <label htmlFor={"HIDED"} className="ml-2 text-lg">ẨN TRÊN WEB</label>
              </div>

            </div>

            <div className='flex'>
              {[5, 4, 3, 2, 1].map((star) => (
                <div className="flex items-center m-4" key={star}>
                  <input
                    id={star.toString()}
                    type="checkbox"
                    value={star}
                    className="w-4 h-4 bg-blue-500 border-gray-300"
                    onChange={handleStarsSearchChange} />
                  <label htmlFor={star.toString()} className="ml-2 text-sm">{renderRatingStars(star)}</label>
                </div>
              ))}

            </div>
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bằng mã đặt phòng hoặc nội dung feedback"
              className="mb-3 py-2 w-full px-4 rounded-lg focus:outline-none focus:ring-gray-300 focus:border-gray-300 border border-gray-300"
            />
            <div className='flex justify-between'>
              <button className='py-2 px-4 rounded border-2 border-gray-300' onClick={resetSearch}>
                <FontAwesomeIcon icon={faRefresh} /> Reset kết quả tìm kiếm
              </button>
              <button className='py-2 px-4 bg-blue-500 text-white rounded' onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} className="text-white" /> Tìm kiếm
              </button>

            </div>
          </div>

          <div className='flex space-x-3'>
            <p className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-md shadow-md">Tổng số đánh giá: {feedBackList?.feedbackListForManager?.length}</p>
          </div>
        </div>


        <div className="rounded-xl overflow-hidden border-2 border-gray-300">

          <table className="w-full text-sm text-left">
            <thead className="text-sm text-gray-700 uppercase bg-white">
              <tr>
                <th scope="col" className="px-2 py-4  bg-gray-300 text-center">
                  #
                </th>
                <th scope="col" className="px-2 py-4 bg-gray-300 text-center">
                  Mã đặt phòng
                </th>
                <th scope="col" className="px-2 py-4 bg-gray-300 text-center">
                  Thời gian đánh giá
                </th>
                <th scope="col" className="px-2 py-4 bg-gray-300 text-center">
                  Người đánh giá
                </th>
                <th scope="col" className="px-2 py-4 bg-gray-300 text-center">
                  Nội dung đánh giá
                </th>
                <th scope="col" className="px-2 py-4 bg-gray-300 text-center">
                  Đánh giá
                </th>
                <th scope="col" className="px-2 py-4 bg-gray-300 text-center">
                  Trạng thái
                </th>
                <th scope="col" className="px-2 py-4 bg-gray-300 text-center">

                </th>
              </tr>
            </thead>
            <tbody>
              {(searchResults?.feedbackListForManager) ? (
                searchResults.feedbackListForManager.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-xl py-4">
                      Không có kết quả tìm kiếm hợp lệ
                    </td>
                  </tr>
                ) : (
                  currentSearchData?.map((feedback, index) => (
                    <FeedbackTableItem key={index} feedback={feedback} index={index} change={change} setChange={setChange} />
                  )))
              ) : (
                currentData?.map((feedback, index) => (
                  <FeedbackTableItem key={index} feedback={feedback} index={index} change={change} setChange={setChange} />
                )))
              }
            </tbody>
          </table>
        </div>
        {searchResults?.feedbackListForManager && (
          <Pagination
            currentPage={currentSearchPage}
            itemsPerPage={itemsPerPage}
            totalItems={searchResults?.feedbackListForManager.length || 0}
            onPageChange={handleSearchPageChange}
          />
        )}
        {!searchResults?.feedbackListForManager && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={feedBackList?.feedbackListForManager?.length || 0}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
