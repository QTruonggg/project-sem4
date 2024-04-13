'use client'
import { IHomestayAndTypeRoomAvailable, IRoomTypeAvailable } from '@/types/homestayBookingType';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface ISelectRoomItemProps {
    handleRoomQuantityChange: (homestayId: number, roomTypeHouseholdId: number, quantity: number) => void;
    item: IHomestayAndTypeRoomAvailable;
    typeRoom: IRoomTypeAvailable;
}

export default function SelectRoomItem({
    handleRoomQuantityChange,
    item,
    typeRoom
}: ISelectRoomItemProps) {
    const [quantity, setQuantity] = React.useState(0);
    return (
        <div className='flex justify-center items-center my-2'>
            <button
                onClick={() => {
                    handleRoomQuantityChange(item.homestayId, typeRoom.roomTypeHouseholdId, quantity - 1)
                    setQuantity(quantity - 1)
                }}
                disabled={quantity <= 0}
                className='mx-2 px-4 py-2 text-center border-mint-green border-2 rounded-md'>
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
                type="text"
                id={typeRoom.roomTypeHouseholdId.toString()}
                value={quantity}
                readOnly
                className='py-2 mx-3 w-1/4 h-fit text-center border-mint-green border-2 rounded-md'
            />
            <button
                onClick={() => {
                    handleRoomQuantityChange(item.homestayId, typeRoom.roomTypeHouseholdId, quantity + 1)
                    setQuantity(quantity + 1)
                }}
                disabled={quantity >= typeRoom.quantity}
                className='mx-2 px-4 py-2 text-center border-mint-green border-2 rounded-md'>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}
