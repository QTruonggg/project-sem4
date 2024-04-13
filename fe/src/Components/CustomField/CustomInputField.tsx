import { ILoginFormValues } from '@/app/auth/login/page';
import * as React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

export interface CustomInputFieldProps {
  label: string;
  register: UseFormRegister<ILoginFormValues>;
  required: boolean;
  name: Path<ILoginFormValues>;
  type: string;
}

export default function CustomInputField({
  label,
  register,
  required,
  name,
  type,
}: CustomInputFieldProps) {
  return (
    <div className="relative mt-5">
      <input
        type={type}
        id={label}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-400-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        {...register(name, { required })}
      />
      <label
        htmlFor={label}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
}
