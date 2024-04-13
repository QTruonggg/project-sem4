'use client'
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export interface IMenuItemProps {
    path: string;
    label: string;
}

export default function MenuItem({ path, label }: IMenuItemProps) {
    const pathname = usePathname();
    const isActive = (path: string) => {
        return pathname?.includes(path);
    };
    return (
        <Link href={path}>
            <li
                className={
                    `md:px-7 px-2 md:py-4 text-xs md:text-base ${path.includes('/review-history') ? '' : 'border-r-2  border-box-color-500'} ${isActive(path) ? 'relative' : ''
                    }`
                }
            >
                {label}
                {isActive(path) && (
                    <p className="absolute -bottom-3 left-1/2 transform -translate-x-2/3 bg-mint-green h-1 w-3/4"></p>
                )}
            </li>
        </Link>

    );
}
