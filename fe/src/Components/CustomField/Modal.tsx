import * as React from 'react';

export interface IModalProps {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export default function Modal (props: IModalProps) {
    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(e.target === e.currentTarget) {
            props.onClose();
        }
    }
    if(!props.isVisible) return (null)
  return (
    <div className='fixed bg-black inset-0 bg-opacity-25 flex
     backdrop-blur-sm justify-center items-center backdrop-filter z-50 overflow-hidden'
      onClick={handleClose}
      id='wrapper'>
      <div className='flex flex-col'>
        <button className='text-white text-xl self-end'
        onClick={props.onClose}>X</button>
        <div className='bg-white p-2 rounded'>
            {props.children}
        </div>
      </div>
    </div>
  );
}
