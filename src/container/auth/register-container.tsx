'use client'
import Image from 'next/image'

import LogoMage from '~/assets/images/component/logo-mage.png'
import { auth } from '@/utils/firebase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'

import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/form/input'
import { Toaster } from 'react-hot-toast'
import GoogleButton from '@/components/button/google-login'

const RegisterFormSchema = z
    .object({
        name: z.string(),
        email: z.string().email({ message: 'Perhatikan format email!' }),
        password: z.string(),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: 'Kata sandi tidak cocok',
        path: ['confirm'],
    })

type RegisterProps = z.infer<typeof RegisterFormSchema>

const RegisterInitialValue: RegisterProps = {
    name: '',
    email: '',
    password: '',
    confirm: '',
}

// const handleRegister = async (data:RegisterProps) =>{
// try {

// } catch (error) {

// }
// }

export default function RegisterContainer() {
    const methods = useForm<RegisterProps>({
        defaultValues: RegisterInitialValue,
        mode: 'onTouched',
        resolver: zodResolver(RegisterFormSchema),
    })

    const [user] = useAuthState(auth)
    const router = useRouter()
    useEffect(() => {
        if (user) {
            toast.success('Register successful!')
            router.push('/')
        }
    }, [user])

    const { register, handleSubmit, reset } = methods

    const onSubmit = (data: RegisterProps) => {
        console.log(data)
    }

    return (
        <FormProvider {...methods}>
            <Toaster />
            <h1 className="font-airstrike text-7xl text-sky-400">MAGE</h1>
            <h2 className="text-xl text-sky-400">Multimedia and Game Event</h2>
            <section className="flex flex-col space-y-5 rounded-3xl bg-custom-grey p-10 sm:w-[450px]">
                <Image src={LogoMage} alt="logo" width={75} height={75} className="mx-auto" />
                <h4 className="text-center">Register to Dashboard MAGE 9</h4>
                <form className="mx-auto w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input type="name" id="name" name="name" label="Name" />
                    <Input type="email" id="email" name="email" label="Email" />
                    <Input type="password" id="password" name="password" label="Your Password" />
                    <Input type="password" id="confirm" name="confirm" label="Confirm Password" />
                    <button
                        className="col-span-2 mx-auto mt-10 flex h-10 w-full items-center justify-center gap-5 rounded bg-blue-600 text-white hover:bg-blue-400 hover:text-white hover:shadow-lg"
                        type="submit"
                    >
                        Log In
                    </button>
                </form>
                <div className="text-sm font-medium text-gray-300">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-700 hover:underline">
                        Login
                    </Link>
                </div>
                <div className="mx-auto">
                    <GoogleButton />
                </div>
            </section>
        </FormProvider>
    )
}
