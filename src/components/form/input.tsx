'use client'
import merge from '@/utils/merge'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string
    labelClassName?: string
    label?: React.ReactNode | string
    showError?: boolean
    placeholder?: string
}

export default function Input({
    id,
    className,
    labelClassName,
    placeholder,
    type = 'text',
    label = '',
    showError = true,
    ...rest
}: InputProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false)

    return (
        <div className=" font-poppins block w-full">
            <label htmlFor={id} className={merge('text-sm', labelClassName)}>
                {label}
            </label>
            <div className="flex items-center justify-center">
                <input
                    {...register(id)}
                    {...rest}
                    placeholder={placeholder}
                    id={id}
                    type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
                    className={merge(
                        'w-full rounded border-gray-500 bg-gray-600 p-2.5 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
                        className
                    )}
                />
                {type === 'password' && (
                    <div className="-ml-5 mt-1 text-sm text-black">
                        <button type="button" className="p-0" onClick={() => setIsPasswordVisible((old) => !old)}>
                            {isPasswordVisible ? <PiEyeClosedLight /> : <PiEyeLight />}
                        </button>
                    </div>
                )}
            </div>
            {showError && (
                <p className="text-start text-sm text-red-400  max-md:ml-12">
                    {errors[id] && String(errors[id]?.message)}
                </p>
            )}
        </div>
    )
}
