import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export interface ISuccessModalProps {
    isVisible: boolean;
    onClose: () => void;
    message: string;
}

export default function SuccessModal(props: ISuccessModalProps) {
    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    }
    const { onClose } = props;
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                props.onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    });
    if (!props.isVisible) return (null)
    return (
        <div className='fixed bg-black inset-0 bg-opacity-25 flex
     backdrop-blur-sm justify-center items-center backdrop-filter z-50 overflow-hidden'
            onClick={handleClose}
            id='wrapper'>
            <div className="bg-white p-16 pb-10 rounded-lg shadow-md text-center">
                <FontAwesomeIcon icon={faCheck} beat size="5x" style={{ color: '#43c021'}}/>
                <h2 className="md:text-2xl text-base text-gray-900 font-semibold">{props.message}</h2>
                <div className="py-3">
                    <button
                        className="px-12 rounded-md font-semibold py-3 bg-green-500 text-white hover:bg-green-600 duration-300"
                        onClick={props.onClose}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
