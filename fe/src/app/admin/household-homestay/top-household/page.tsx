'use client'
import FailedModal from '@/Components/CustomField/FailedModal';
import Modal from '@/Components/CustomField/Modal';
import SuccessModal from '@/Components/CustomField/SuccessModal';
import TopHouseholdItem from '@/Components/admin/top-household/TopHouseholdItem';
import LoadingPage from '@/Components/common/LoadingPage';
import householdApi from '@/api/householdApi';
import { ITop5HouseholdList, addTopHousehold } from '@/types/householdType';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';


export interface ITopHouseholdProps {
}

export default function TopHousehold(props: ITopHouseholdProps) {
  const [loading, setLoading] = React.useState(false);
  const [topHouseholdList, setTopHouseholdList] = React.useState<ITop5HouseholdList>();
  const [isAdding, setIsAdding] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showFailModal, setShowFailModal] = React.useState(false);
  const getTopHouseholdList = async () => {
    setLoading(true);
    try {
      const res = await householdApi.getTop5Household();
      setTopHouseholdList(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const isAddValid = () => {
    console.log(topHouseholdList);
    if (((topHouseholdList?.householdNotInTop?.length||0)>0) && (topHouseholdList?.topList?.length||0)>0) {
      return true;
    }
    return false;
  }

  React.useEffect(() => {
    getTopHouseholdList();
  }, [change]);

  const handleAddTopHousehold = async (data: addTopHousehold) => {
    setLoading(true);
    try {
      await householdApi.addTopHousehold(data);
      setShowModal(true);
      setIsAdding(false);
      setChange(!change);
    } catch (error) {
      console.log(error);
      setShowFailModal(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-11/12 mx-auto my-8'>
      {loading && <LoadingPage />}
      <div className='flex justify-between mb-10'>
        <p className='font-bold text-4xl'>
          TOP CÁC HỘ KINH DOANH NỔI BẬT
        </p>
        <button
        onClick={() => setIsAdding(true)}
          className={`px-3 py-2 rounded-lg ${isAddValid()
            ? 'bg-blue-500 hover:bg-opacity-50'
            : 'bg-gray-300 cursor-not-allowed'
            } font-semibold text-white`}
          disabled={!isAddValid()}
        >
          <FontAwesomeIcon icon={faPlusCircle} /> Thêm hộ kinh doanh nổi bật
        </button>
      </div>
      <div className="rounded-xl mb-3 border border-gray-300">

        <table className="w-full rounded-xl overflow-hidden text-sm ">
          <thead className=" text-gray-700 bg-white">
            <tr>
              <th scope="col" className="px-2 py-2  bg-gray-300 text-center">
                #
              </th>
              <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                Hộ kinh doanh
              </th>
              <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                Homestay
              </th>
              <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                Chủ hộ kinh doanh
              </th>
              <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                Số điện thoại
              </th>
              <th scope="col" className="px-2 py-2 bg-gray-300 text-center">
                TOP
              </th>
              <th scope="col" className="px-2 py-2 bg-gray-300 text-center">

              </th>
            </tr>
          </thead>
          <tbody>
            {topHouseholdList?.householdList?.map((household, index) => (
              <TopHouseholdItem key={household.id} household={household} index={index} change={change} setChange={setChange} />
            ))}
          </tbody>
        </table>
      </div>
      <Modal isVisible={isAdding} onClose={() => setIsAdding(false)}>
        <div className='p-5 mx-auto'>
          <p className='text-2xl font-bold mb-5'>Thêm hộ kinh doanh nổi bật</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.target as HTMLFormElement);
              const dataObj: addTopHousehold = {
                householdId: parseInt(data.get('householdId') as string),
                top: parseInt(data.get('top') as string),
              }
              handleAddTopHousehold(dataObj);
            }}
          >
            <div className='mb-5'>
              <label className='block mb-2 font-semibold' htmlFor='householdId'>Hộ kinh doanh</label>
              <select
                className='w-full border border-gray-300 rounded-lg px-3 py-2'
                name='householdId'
                id='householdId'
              >
                {topHouseholdList?.householdNotInTop?.map((household) => (
                  <option key={household.householdId} value={household.householdId}>{household.householdName}</option>
                ))}
              </select>
            </div>
            <div className='mb-5'>
              <label className='block mb-2 font-semibold' htmlFor='top'>Top</label>
              <select
                className='w-full border border-gray-300 rounded-lg px-3 py-2'
                name='top'
                id='top'
              >
                {topHouseholdList?.topList.map((top) => (
                  <option key={top} value={top}>{top}</option>
                ))}
              </select>
            </div>
            <div className='flex justify-end'>
              <button
                className='px-3 py-2 rounded-lg bg-blue-500 hover:bg-opacity-50 text-white font-semibold'
                type='submit'
              >
                Thêm
              </button>
            </div>
          </form>
        </div>      
      </Modal>

      <SuccessModal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        message={'Thêm thành công'} />
      <FailedModal
        isVisible={showFailModal}
        onClose={() => {
          setShowFailModal(false);
        }}
        message={'Thêm thất bại'}
      />
    </div>
  );
}
