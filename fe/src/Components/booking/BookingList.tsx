import * as React from 'react';


export interface IBookingListProps {
  children: React.ReactNode;
}

export default function BookingList({ children }: IBookingListProps) {
  return (
    <div className="">
      <div className="rounded-xl shadow-md shadow-gray-300 px-6 py-4">
        {children}
      </div>
    </div>
  );
}
