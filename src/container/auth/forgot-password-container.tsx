'use client'
import Input from '@/components/form/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { BsChevronLeft } from 'react-icons/bs'
import { z } from 'zod'
import LogoMage from '~/assets/images/component/logo-mage.png'

const ForgotRequestSchema = z.object({
    email: z.string().email({ message: 'Perhatikan format email!' }),
})

type ForgotRequestProps = z.infer<typeof ForgotRequestSchema>

const ForgotRequestInitialValue: ForgotRequestProps = {
    email: '',
}

// const ForgotRequestUser = async (email: string) => {
//     try {
//         await api.post('/forgotRequest_password/request', {
//             email: email,
//         })
//     } catch (error) {
//         throw error
//     }
// }

export default function ForgotRequestPasswordContainer() {
    const methods = useForm<ForgotRequestProps>({
        defaultValues: ForgotRequestInitialValue,
        mode: 'onTouched',
        resolver: zodResolver(ForgotRequestSchema),
    })
    const { handleSubmit, reset } = methods

    const onSubmit = (data: ForgotRequestProps) => {
        console.log(data)
        reset()
    }

    return (
        <FormProvider {...methods}>
            <Toaster />
            <h1 className="font-airstrike text-7xl text-sky-400">MAGE</h1>
            <h2 className="text-xl text-sky-400">Multimedia and Game Event</h2>
            <section className="flex flex-col space-y-5 rounded-3xl bg-custom-grey p-10 sm:w-[450px]">
                <Image src={LogoMage} alt="logo" width={75} height={75} className="mx-auto" />
                <h4 className="text-center">Register to Dashboard MAGE 9</h4>
                <form className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-xl font-medium  text-white">Reset Password</h3>
                    <p className="text-sm text-white ">
                        ForgotRequestten your password? Enter your e-mail address below, and we&apos;ll send you an
                        e-mail allowing you to reset it.
                    </p>
                    <div>
                        <Input type="email" name="email" id="email" label="Email" />
                    </div>

                    <button
                        type="submit"
                        className={`w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-400  
                focus:ring-4 focus:ring-blue-300 `}
                    >
                        Reset Password
                    </button>
                    <Link href="/login" className="inline-flex items-center gap-1.5 text-blue-700 hover:underline">
                        <BsChevronLeft />
                        <span>Back to Login</span>
                    </Link>
                </form>
            </section>
        </FormProvider>
    )
}
