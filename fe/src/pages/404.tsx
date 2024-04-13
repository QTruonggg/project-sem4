import { Button, Result } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface INotFoundPageProps {
}

export default function NotFoundPage(props: INotFoundPageProps) {
    const router = useRouter();

    const handleClickToHome = () => {
        router.back();
    }
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
                extra={<Button onClick={handleClickToHome} type="primary">Quay lại</Button>}
            />
        </div>
    );
}