import React, { useState } from 'react';

interface PopConfirmProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const PopConfirm: React.FC<PopConfirmProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className='p-5 w-96 text-lg'>{message}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg"
            onClick={() => {
              onConfirm();
              onCancel();
            }}
          >
            Xác nhận
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onCancel}>
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopConfirm;