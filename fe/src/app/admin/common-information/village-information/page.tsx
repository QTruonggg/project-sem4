'use client';
import { Card, Col, Row, Space, Image, Upload, Button } from 'antd';
import * as React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { IVillageInformationResponse } from '@/types/villageInformationType';
import villageInformationApi from '@/api/villageInformationApi';
import OurStory from './ourStory';
import StayService from './stayService';
import CultureInformation from './culture';
import ServiceAndLocalProduct from './serviceAndLocalProduct';
import OurValue from './ourValue';
import LoadingPage from '@/Components/common/LoadingPage';



export interface IVillageInformationManagementProps {
}

export default function VillageInformationManagement(props: IVillageInformationManagementProps) {

    const [listVillageInformation, setListVillageInformation] = React.useState<IVillageInformationResponse[]>([]);
    const [ourStoryInformation, setOurStoryInformation] = React.useState<IVillageInformationResponse>();
    const [stayServiceInformation, setStayServiceInformation] = React.useState<IVillageInformationResponse>();
    const [cultureInformation, setCultureInformation] = React.useState<IVillageInformationResponse>();
    const [serviceAndProductInformation, setServiceAndProductInformation] = React.useState<IVillageInformationResponse>();
    const [ourValueInformation, setOurValueInformation] = React.useState<IVillageInformationResponse>();

    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setLoading(true);
        villageInformationApi.getVillageInformationsByAdmin().then((res) => {
            setListVillageInformation(res.villageInformation);

            const ourStory = res.villageInformation.filter((item) => item.type === 'OUR_STORY');
            setOurStoryInformation(ourStory[0]);

            const stayService = res.villageInformation.filter((item) => item.type === 'STAY_SERVICE');
            setStayServiceInformation(stayService[0]);

            const culture = res.villageInformation.filter((item) => item.type === 'CULTURE');
            setCultureInformation(culture[0]);

            const serviceAndProduct = res.villageInformation.filter((item) => item.type === 'SERVICE_AND_LOCAL_PRODUCT');
            setServiceAndProductInformation(serviceAndProduct[0]);

            const ourValue = res.villageInformation.filter((item) => item.type === 'OUR_VALUE');
            setOurValueInformation(ourValue[0]);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return (
        <>
         {loading && <LoadingPage />}
            <div className='px-8 pt-5'>
                <p className='text-2xl font-semibold'>Thông tin giới thiệu</p>
            </div>

            <div className='px-8 py-5'>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

                    <OurStory ourStoryInformation={ourStoryInformation}  setOurStoryInformation={setOurStoryInformation} />

                    <StayService stayServiceInformation={stayServiceInformation} setStayServiceInformation={setStayServiceInformation}/>

                    <CultureInformation cultureInformation={cultureInformation} setCultureInformation={setCultureInformation}/>

                    <ServiceAndLocalProduct serviceAndProductInformation={serviceAndProductInformation} setServiceAndProductInformation={setServiceAndProductInformation} />

                    <OurValue ourValueInformation = {ourValueInformation} setOurValueInformation={setOurValueInformation}/>
                </Space>



            </div >


        </>
    );
}

