
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface ILogoAndTitleRegisterProps {
    href: string;
    imageURL: string;
    description: string;
    title:string
}

export default function  LogoAndTitleRegister({href,imageURL,description,title}: ILogoAndTitleRegisterProps) {
    return (
        <div className='w-96'>
            <Link href={href}>
                <Image src={imageURL} width={112} height={0} alt="#" className="object-cover" />
            </Link>
            <h1 className="text-2xl font-bold mb-2 mt-10">{title}</h1>
            <p className="mb-5 text-gray-400 text-sm font-medium">
                {description}
            </p>
        </div>
    );
}