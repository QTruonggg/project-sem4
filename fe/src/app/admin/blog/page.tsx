"use client";
import BlogData from "@/Components/blog/BlogData";
import Pagination from "@/Components/booking/Pagination";
import LoadingPage from "@/Components/common/LoadingPage";
import blogApi from "@/api/blogApi";
import { IBlogAdmin } from "@/types/blogType";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface IBlogAdminProps {}

export default function BlogAdmin(props: IBlogAdminProps) {
  const router = useRouter();
  const isDataLoaded = React.useRef(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [blogData, setBlogData] = React.useState<IBlogAdmin[]>();
  const [displayData, setDisplayData] = React.useState<IBlogAdmin[]>();
  const [searchData, setSearchData] = React.useState<IBlogAdmin[]>();
  const [displayLength, setDisplayLength] = React.useState<number>(0);

  const [selectedStatus, setSelectedStatus] = React.useState<string>("Tất cả");

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [changeData, setChangeData] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentSearchPage, setCurrentSearchPage] = React.useState(1);

  const [isDropdownVisible, setDropdownVisible] = React.useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearchPageChange = (page: number) => {
    setCurrentSearchPage(page);
  };

  React.useEffect(() => {
    setLoading(true);
    blogApi
      .getBlogAdmin()
      .then((res) => {
        console.log(res);
        setBlogData(res.news);
        setDisplayData(res.news);
        setDisplayLength(res.news.length);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isDataLoaded.current = true;
        setLoading(false);
      });
    handleSearch(searchValue);
    setDisplayList(selectedStatus);
  }, [changeData]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = Array.isArray(displayData)
    ? displayData.slice(startIndex, endIndex)
    : [];
  const currentSearchData = Array.isArray(searchData)
    ? searchData.slice(startIndex, endIndex)
    : [];

  React.useEffect(() => {
    if (isDataLoaded.current) {
      handleSearch(searchValue);
      setDisplayList(selectedStatus);
    }
  }, [displayData, displayLength, searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const searchValue = typeof e === "string" ? e : e.target.value;
    setSearchValue(searchValue);
    if (searchValue === "") {
      setSearchData(undefined);
      setCurrentSearchPage(1);
    } else {
      const searchResult = displayData?.filter((request) => {
        return (
          request.shortDescription
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          request.shortDescription
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
      setSearchData(searchResult);
      setCurrentSearchPage(1);
    }
  };

  const setDisplayList = (status: string) => {
    setCurrentPage(1);
    if (status === "Tất cả") {
      setDisplayData(blogData as IBlogAdmin[]);
      setDisplayLength(blogData?.length as number);
    } else if (status === "Tin tức du lịch") {
      const pendingList = blogData?.filter(
        (request) => request.subject === "TRAVEL_NEWS"
      );
      setDisplayData(pendingList as IBlogAdmin[]);
      setDisplayLength(pendingList?.length as number);
    } else if (status === "Điểm đến") {
      const pendingList = blogData?.filter(
        (request) => request.subject === "DESTINATION"
      );
      setDisplayData(pendingList as IBlogAdmin[]);
      setDisplayLength(pendingList?.length as number);
    } else if (status === "Văn hóa ẩm thực") {
      const pendingList = blogData?.filter(
        (request) => request.subject === "CULTURE_AND_FOOD"
      );
      setDisplayData(pendingList as IBlogAdmin[]);
      setDisplayLength(pendingList?.length as number);
    } else if (status === "Cẩm nang du lịch") {
      const pendingList = blogData?.filter(
        (request) => request.subject === "TRAVEL_GUIDE"
      );
      setDisplayData(pendingList as IBlogAdmin[]);
      setDisplayLength(pendingList?.length as number);
    } else if (status === "Tình nguyện") {
      const pendingList = blogData?.filter(
        (request) => request.subject === "VOLUNTEER"
      );
      setDisplayData(pendingList as IBlogAdmin[]);
      setDisplayLength(pendingList?.length as number);
    } else if (status === "Khác") {
      const pendingList = blogData?.filter(
        (request) => request.subject === "OTHER"
      );
      setDisplayData(pendingList as IBlogAdmin[]);
      setDisplayLength(pendingList?.length as number);
    }
    setSelectedStatus(status);
  };

  return (
    <div className="w-11/12 mx-auto">
      {loading && <LoadingPage />}
      <p className="text-2xl font-bold my-4">Tin tức</p>

      <div className="grid grid-cols-12 gap-6">
        <button
          onClick={() => {
            setLoading(true);
            router.push("/admin/blog/create");
          }}
          className={`col-span-2 py-2 rounded-lg bg-blue-500 hover:bg-opacity-50 font-semibold text-white`}
        >
          <FontAwesomeIcon icon={faPlusCircle} /> Thêm bài đăng
        </button>
        <div className="col-span-5">
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
              </svg>
            </span>
            <input
              type="text"
              onChange={handleSearch}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tìm kiếm"
            />
          </div>
        </div>

        <div className="col-span-5 grid grid-cols-3 gap-6">
          <div className="col-span-1"></div>

          <div className="relative col-span-2">
            <button
              className="w-full justify-around text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setDropdownVisible(!isDropdownVisible)}
            >
              Lọc theo: {selectedStatus}
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isDropdownVisible && (
              <div className="z-10 bg-white divide-y absolute mt-2 divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="text-sm text-gray-700 dark:text-gray-200">
                  <li className="py-2 hover:bg-gray-100 px-2">
                    <p
                      onClick={() => {
                        setDropdownVisible(false);
                        setDisplayList("Tất cả");
                      }}
                    >
                      Tất cả
                    </p>
                  </li>
                  <li className="py-2 hover:bg-gray-100 px-2">
                    <p
                      onClick={() => {
                        setDropdownVisible(false);
                        setDisplayList("Tin tức du lịch");
                      }}
                    >
                      Tin tức du lịch
                    </p>
                  </li>
                  <li className="py-2 hover:bg-gray-100 px-2">
                    <p
                      onClick={() => {
                        setDropdownVisible(false);
                        setDisplayList("Điểm đến");
                      }}
                    >
                      Điểm đến
                    </p>
                  </li>
                  <li className="py-2 hover:bg-gray-100 px-2">
                    <p
                      onClick={() => {
                        setDropdownVisible(false);
                        setDisplayList("Văn hóa ẩm thực");
                      }}
                    >
                      Văn hóa ẩm thực
                    </p>
                  </li>
                  <li className="py-2 hover:bg-gray-100 px-2">
                    <p
                      onClick={() => {
                        setDropdownVisible(false);
                        setDisplayList("Cẩm nang du lịch");
                      }}
                    >
                      Cẩm nang du lịch
                    </p>
                  </li>
                  <li className="py-2 hover:bg-gray-100 px-2">
                    <p
                      onClick={() => {
                        setDropdownVisible(false);
                        setDisplayList("Từ thiện");
                      }}
                    >
                      Từ thiện
                    </p>
                  </li>
                  <li className="py-2 hover:bg-gray-100 px-2">
                    <p
                      onClick={() => {
                        setDropdownVisible(false);
                        setDisplayList("Khác");
                      }}
                    >
                      Khác
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="p-4 flex justify-between">
          <span className="text-lg font-bold">Danh sách bài đăng</span>
          <span className="px-4 py-2 rounded-xl bg-blue-500 font-semibold text-white">
            Tổng số bài đăng: {displayLength} bài đăng
          </span>
        </p>
        <div className="rounded-xl overflow-hidden border-2 border-gray-300 mb-3">
          <table className="w-full text-sm">
            <thead className=" text-gray-700 bg-white">
              <tr>
                <th scope="col" className="px-2 py-2  bg-gray-300 text-center">
                  #
                </th>
                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                  Tiêu đề
                </th>
                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                  Chủ đề
                </th>
                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                  Mô tả tóm tắt
                </th>
                <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                  Thời gian đăng
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 bg-gray-300 text-center"
                ></th>
              </tr>
            </thead>
            <tbody>
              {searchData &&
                currentSearchData?.map((blog, index) => (
                  <BlogData
                    key={index}
                    index={index}
                    blog={blog}
                    change={changeData}
                    setChange={setChangeData}
                  />
                ))}
              {!searchData &&
                (!displayData ? (
                  <tr>
                    <td colSpan={8} className="text-center text-xl py-2">
                      Không có dữ liệu để hiển thị
                    </td>
                  </tr>
                ) : currentData ? (
                  currentData?.map((blog, index) => (
                    <BlogData
                      key={index}
                      index={index}
                      blog={blog}
                      change={changeData}
                      setChange={setChangeData}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-xl py-2">
                      Không có dữ liệu để hiển thị
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center text-center mb-8">
          {!searchData && (
            <Pagination
              currentPage={currentPage}
              totalItems={displayLength}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
          {searchData && (
            <Pagination
              currentPage={currentSearchPage}
              totalItems={searchData?.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handleSearchPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
