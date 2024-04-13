'use client';
import LoadingPage from '@/Components/common/LoadingPage';
import introductionApi from '@/api/introductionApi';
import { IntroductionResponse, villageInformations } from '@/types/introductionType';
import { Card, Col, Rate, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export interface IIntroductionPageProps {
}

export default function IntroductionPage(props: IIntroductionPageProps) {
  const [introduction, setIntroduction] = React.useState<IntroductionResponse>();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    introductionApi.getIntroductionCustomer().then(res => {
      return setIntroduction(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  console.log(introduction);
  return (
    <>

      <div className='text-center overflow-hidden rounded-b-xl 
            bg-cover bg-[url("/images/LangMongPaViHome.jpg")] h-60'>
        <p className='text-white font-bold text-3xl pt-16'>GIỚI THIỆU</p>
        <p className='text-white font-bold text-3xl'>V-HOMESTAY</p>
      </div>

      <div className='w-3/4 mx-auto justify-center'>
        {loading && <LoadingPage />}
        {introduction && introduction.villageInformations && introduction.villageInformations[0] && (

          <>
            <div className="grid grid-cols-2 mt-20">
              <div>
                <h1 className='text-[#0F6900] font-semibold'>
                  Câu chuyện của chúng tôi
                </h1>
                <div className='text-5xl font-semibold w-[6h] mt-5'>
                  {introduction.villageInformations[0].title}
                </div>

              </div>
              <div>
                <p className='text-justify'>{introduction.villageInformations[0].description}</p>
              </div>

            </div>
            <div>
              <Image className='w-full h-[90vh] object-cover mt-10 mb-10 rounded-md' src={introduction.villageInformations[0].images[0].filePath} width={500} height={500} alt={''} />
            </div>
          </>

        )}


        <div className="grid grid-cols-2 mt-20 space-x-10">
          <div className='w-[70vh]'>
            <h1 className='text-[#0F6900] font-semibold'>
              Dịch vụ lưu trú
            </h1>
            {/* <div className='text-4xl font-semibold w-full mt-5'>
              {introduction && introduction.villageInformations[0] && introduction.villageInformations[0].title}
            </div>
            <div className='mt-5 '>
              {introduction && introduction.villageInformations[0] && introduction.villageInformations[0].description}
            </div> */}


            <div className='flex space-x-40 mt-10'>
              <div>
                <p className=' text-4xl mb-2 font-semibold'>
                  {introduction?.totalHousehold}
                </p>
                <span>Hộ kinh doanh</span>
              </div>
              <div>
                <p className=' text-4xl mb-2 font-semibold'>
                  {introduction?.totalHomestay}
                </p>
                <span>Căn homestay</span>
              </div>
            </div>
            <div className='flex space-x-24 mt-10'>
              <div>
                <p className='text-4xl mb-2 font-semibold'>
                {introduction?.villageInformations && introduction.villageInformations[1]?.totalVisitedCustomer}+
                </p>
                <span>Lượt khách lưu trú/năm</span>
              </div>
              <div>
                <p className='text-4xl mb-2 font-semibold'>
                {introduction?.villageInformations && introduction.villageInformations[1]?.totalVisitor}+
                </p>
                <span>Lượt khách tham quan/năm</span>
              </div>
            </div>

          </div>

          <div>
          <Image
  alt="Map"
  src={
    introduction?.villageInformations &&
    introduction.villageInformations[1]?.images &&
    introduction.villageInformations[1].images[0]?.filePath
      ? introduction.villageInformations[1].images[0].filePath
      : '/images/LangMongPaViHome.jpg'
  }
  className="object-cover rounded-md"
  width={1000}
  height={500}
/>

          </div>
        </div>


        <div>
          <div className='mt-20 mb-5 mx-auto text-center'>
            <h1 className='font-semibold text-4xl'>
              Các hộ kinh doanh đã có mặt trên hệ thống
            </h1>
            <p className='mx-auto'>
              Quý khách có thể click vào tên homestay hoặc đặt phòng ngay cùng với
            </p>
          </div>
          <Row>
            {introduction?.householdResponseDtos.map((household) => (
              <Col key={household.id} span={6}>
                <Card style={{ width: '95%' }} className='my-2 shadow-sm'>
                  <div>
                    <p className='space-x-1'>
                      Vị trí {household.homestays.map((homestay, index) => (
                        <span className='ml-2' key={index}>{homestay.homestayCode}{index !== household.homestays.length - 1 ? ' -' : ''}</span>
                      ))}
                    </p>
                    <Link href={'/introduction/' + household.id} className='font-semibold text-xl'> {household.householdName}</Link>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* <div className='mt-20'>
          <h1 className='text-[#0F6900] font-semibold' >
            Văn hóa
          </h1>
          <div className='text-4xl font-semibold w-full'>
          {introduction?.villageInformations[2]?.title || 'Default Title'}
          </div>
          <div className='w-[100vh] mt-5'>
          {introduction?.villageInformations[2]?.description || 'Default Description'}
          </div>

          <div className='flex space-x-6 mx-auto justify-center mt-5'>
            {introduction?.villageInformations[2].images.map((image, index) => (
              <Image key={index} className='w-[67vh] h-[30vh] object-coverrounded-md rounded-md' src={image.filePath} width={500} height={500} alt={''} />
            ))}
          </div>
        </div> */}


        <div className='mt-20 w-2/3'>
          <h1 className='text-[#0F6900] font-semibold mt-10'>
            Dịch vụ và sản phẩm địa phương
          </h1>
          {/* <div className='text-4xl font-semibold w-full flex items-center mb-4'>
            {introduction?.villageInformations[3].title}
          </div>
          <div className='w-[80vh] mt-5'>
            {introduction?.villageInformations[3].description}
          </div> */}
        </div>

        <div className='mt-10'>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={12} push={11}>
                  <div className='ml-5'>
                    <div className='text-lg font-semibold'>
                      Dịch vụ đặc biệt
                    </div>
                    <div className='mb-2 text-justify'>
                      V-HomeStay mang đến cho du khách trải nghiệm độc đáo với dịch vụ trekking khám phá vùng núi đá hùng vĩ, cùng với hoạt động trồng rau, hái quả và tham gia các nghi lễ tôn giáo của người H&apos;Mông.
                    </div>
                    <Link href='/service' className='items-center'>
                      <button className='text-center w-28 py-1 bg-[#8DD3BB] hover:bg-[#56B993] rounded'>Xem thêm</button>
                    </Link>
                  </div>
                </Col>
                <Col span={11} pull={12}>
                  <Image src={`/images/services1.jpg`} className='rounded-md' alt='' height={0} width={1000} />
                </Col>
              </Row>

            </Col>
            <Col span={12}>
              <Row>
                <Col span={12} push={11}>
                  <div className='ml-5'>
                    <div className='text-lg font-semibold'>
                      Sản phẩm địa phương
                    </div>
                    <div className='mb-2 text-justify'>
                      V-HomeStay mang đến cho du khách trải nghiệm độc đáo với dịch vụ trekking khám phá vùng núi đá hùng vĩ, cùng với hoạt động trồng rau, hái quả và tham gia các nghi lễ tôn giáo của người H&apos;Mông.
                    </div>
                    <Link href='/local-product' className='items-center'>
                      <button className='text-center w-28 py-1 bg-[#8DD3BB] hover:bg-[#56B993] rounded'>Xem thêm</button>
                    </Link>
                  </div>
                </Col>
                <Col span={11} pull={12}>
                  <Image src={`/images/MuaNhac.jpg`} className='rounded-md h-[26vh] object-cover' alt='' height={0} width={1000} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {introduction && introduction.villageInformations && introduction.villageInformations[0] && (
          <>
            <div className=" mt-20 text-center">
              <div>
                <h1 className='text-[#0F6900] font-semibold'>
                  Giá trị của chúng tôi
                </h1>
                <div className='text-4xl font-semibold w-full mt-5'>
                  {introduction.villageInformations[4].title}
                </div>
                <div className='mt-5 w-[52vh] mx-auto text-center'>
                  {introduction.villageInformations[4].description}
                </div>
                <Link href='/image-gallery' className='items-center'>
                  <button className='mt-10 text-center w-[45vh] py-1.5 bg-[#8DD3BB] hover:bg-[#56B993] rounded'>Chào mừng bạn đến với V-HomeStay của chúng tôi</button>
                </Link>
              </div>
            </div>
          </>
        )}

        <div className=" mt-20 text-center">
          <div>
            <div className='text-3xl font-semibold w-full mt-5'>
              Du khách nói về chúng tôi
            </div>

            <div className='flex space-x-5 mx-auto justify-center mt-10'>
              <div className="w-96 bg-white rounded-lg border border-gray-500 p-6">
                <div className="flex items-center mb-4">
                  <Rate allowHalf defaultValue={5} />
                </div>
                <div className="text-gray-600 mb-4">
                  &quot;V-HomeStay là một điểm đến tuyệt vời cho du khách muốn khám phá văn hóa và đời sống của người dân địa phương. Với cảnh quan đẹp, khí hậu mát mẻ và những hoạt động truyền thống hấp dẫn như trekking, trồng rau, hái quả và tham gia các nghi lễ tôn giáo, V-HomeStay đã thu hút được sự quan tâm của nhiều du khách trong và ngoài nước&quot;.
                </div>
                <div className="flex items-center text-gray-800 font-semibold">
                  <Image width={1000} height={0} src="/images/avt.png" alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  <span>Nguyễn Trọng Tuấn</span>
                </div>
              </div>

              <div className="w-96 bg-white rounded-lg border border-gray-500 p-6">
                <div className="flex items-center mb-4">
                  <Rate allowHalf defaultValue={5} />
                </div>
                <div className="text-gray-600 mb-4">
                  &quot;V-HomeStay ở Hà Giang còn được khen ngợi vì những món ăn đậm chất địa phương, đặc biệt là món thịt lợn nướng trên lò đất và thịt trâu gác bếp. Những món ăn này được làm từ những nguyên liệu tươi ngon, được chế biến và nấu theo cách truyền thống của người H&apos;Mông, mang đến hương vị đặc trưng và hấp dẫn. Ngoài ra, du khách còn có thể học hỏi và tìm hiểu thêm về ẩm thực địa phương.&quot;
                </div>
                <div className="flex items-center text-gray-800 font-semibold">
                  <Image width={1000} height={0} src="/images/avt.png" alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  <span>Trịnh Đức Anh</span>
                </div>
              </div>
              <div className="w-96 bg-white rounded-lg border border-gray-500 p-6">
                <div className="flex items-center mb-4">
                  <Rate allowHalf defaultValue={5} />
                </div>
                <div className="text-gray-600 mb-4">
                  &quot;Một trong những điểm đặc biệt của V-HomeStay là sự hiện diện của những chú mèo đáng yêu. Các chú mèo này được coi là vật nuôi may mắn cho gia đình. Du khách đến homestay ở đây sẽ được thưởng thức cảnh quan yên bình, ngắm nhìn những chú mèo đang vui đùa hay nằm nghỉ trên mái nhà, tạo nên không khí thư giãn cho du khách.&quot;
                </div>
                <div className="flex items-center text-gray-800 font-semibold">
                  <Image width={1000} height={0} src="/images/avt.png" alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  <span>Nguyễn Hải Linh</span>
                </div>
              </div>
            </div>



          </div>
        </div>

      </div>

    </>


  );
}
