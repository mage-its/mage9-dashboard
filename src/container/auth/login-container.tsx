'use client'
import Image from 'next/image'

import LogoMage from '~/assets/images/component/logo-mage.png'
import { auth } from '@/utils/firebase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'

import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/form/input'
import GoogleButton from '@/components/button/google-login'
import { Toaster } from 'react-hot-toast'

const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Perhatikan format email!' }),
    password: z.string(),
})

type LoginProps = z.infer<typeof LoginFormSchema>

const LoginInitialValue: LoginProps = {
    email: '',
    password: '',
}

export default function LoginContainer() {
    const methods = useForm<LoginProps>({
        defaultValues: LoginInitialValue,
        mode: 'onTouched',
        resolver: zodResolver(LoginFormSchema),
    })

    const [user] = useAuthState(auth)
    const router = useRouter()
    useEffect(() => {
        if (user) {
            if (user.emailVerified) {
                toast.success('Login successful!')
                router.push('/')
            }
        }
    }, [user])

    const signIn = async (data: LoginProps) => {
        try {
            var userCred = await signInWithEmailAndPassword(auth, data.email, data.password).then((value) => value)
            if (!userCred.user.emailVerified) {
                toast.error('Harap verifikasi email terlebih dahulu!')
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    const { register, handleSubmit, reset } = methods
    const onSubmit = (data: LoginProps) => {
        signIn(data)
    }
    return (
        <FormProvider {...methods}>
            <Toaster />
            <h1 className="font-airstrike text-7xl text-sky-400">MAGE</h1>
            <h2 className="text-xl text-sky-400">Multimedia and Game Event</h2>
            <section className="flex flex-col space-y-5 rounded-3xl bg-custom-grey p-10 sm:w-[450px]">
                <Image src={LogoMage} alt="logo" width={75} height={75} className="mx-auto" />
                <h4 className="text-center">Login to Dashboard MAGE 9</h4>
                <form className="mx-auto w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input type="email" id="email" name="email" label="Your Email" labelClassName="ml-0" />
                    <Input type="password" id="password" name="password" label="Your Password" labelClassName="ml-0" />
                    <button
                        className="col-span-2 mx-auto mt-10 flex h-10 w-full items-center justify-center gap-5 rounded bg-blue-600 text-white hover:bg-blue-400 hover:text-white hover:shadow-lg"
                        type="submit"
                    >
                        Log In
                    </button>
                </form>
                <Link href="/forgotpassword-request" className="text-right text-sm text-blue-700 hover:underline">
                    Forgot Password?
                </Link>
                <div className="text-sm font-medium text-gray-300">
                    Not Registered?{' '}
                    <Link href="/register" className="text-blue-700 hover:underline">
                        Create account
                    </Link>
                </div>
                <div className="mx-auto">
                    <GoogleButton />
                </div>
            </section>
        </FormProvider>
    )
}
