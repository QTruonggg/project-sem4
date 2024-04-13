import React, { useState, useRef } from 'react';

export interface ITextOnBorderInputProps {
    placeholder: string;
    label: string;
    inputId: string;
    divClass: string;
    type?: string;
    value: string;
    validate?: (value: string) => boolean;
}

export default function TextOnBorderInput(props: ITextOnBorderInputProps) {
    const [inputValue, setInputValue] = useState(props.value);
    const [error, setError] = useState('');
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        console.log(newValue);
        if (props.validate) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                const isValid = props.validate!(newValue);
                setError(isValid ? '' : 'Giá trị không hợp lệ');
            }, 700);
        }
    };

    return (
        <div className={`${props.divClass} relative`}>
            <label
                htmlFor={props.inputId}
                className="block absolute text-xs md:text-sm -top-3 left-3 bg-white px-2 text-gray-500"
            >
                {props.label}
            </label>
            <input
                type={props.type}
                id={props.inputId}
                className={`w-full border border-gray-300 rounded px-3 py-2 ${error ? 'border-red-400' : ''}`}
                placeholder={props.placeholder}
                value={inputValue}
                onChange={handleChange}
            />
            {error && <span className="text-sm text-red-400">{error}</span>}
        </div>
    );
}
