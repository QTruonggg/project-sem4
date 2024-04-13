import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export interface INavBookingItemProps {
    path: string;
    children: React.ReactNode;
}

export default function NavBookingItem({ path, children }: INavBookingItemProps) {
        const pathName = usePathname();
    const isActive = (path: string) => {
        return pathName === path;
    };
    return (
        <Link href={path}>
            <li
                className={
                    `md:px-7 px-2 text-center md:py-4 md:text-xl font-semibold ${path==='/booking/cancel' ? '' : 'border-r-2  border-box-color-500'} ${isActive(path) ? 'relative' : ''
                    }`
                }
            >
                {children}
                {isActive(path) && (
                    <span className="absolute -bottom-3 left-1/2 transform -translate-x-2/3 bg-mint-green h-1 w-3/4"></span>
                )}
            </li>
        </Link>

    );
}
