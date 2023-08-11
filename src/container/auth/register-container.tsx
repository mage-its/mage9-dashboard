'use client'
import Image from 'next/image'

import LogoMage from '~/assets/images/component/logo-mage.png'
import { auth } from '@/utils/firebase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { toast } from 'react-hot-toast'

import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/form/input'
import { Toaster } from 'react-hot-toast'
import GoogleButton from '@/components/button/google-login'
import { FirebaseError } from 'firebase/app'

const RegisterFormSchema = z
    .object({
        name: z.string().nonempty('Mohon isi nama anda!'),
        email: z.string().email({ message: 'Perhatikan format email!' }),
        password: z.string().nonempty('Mohon isi kata sandi!').min(6, 'Kata sandi minimal 6 karakter!'),
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

export default function RegisterContainer() {
    const methods = useForm<RegisterProps>({
        defaultValues: RegisterInitialValue,
        mode: 'onTouched',
        resolver: zodResolver(RegisterFormSchema),
    })

    const [user] = useAuthState(auth)
    const router = useRouter()
    const verifNotif = async () => {
        toast.success('Verifikasi email berhasil dikirim!')
        await new Promise(res => setTimeout(res, 2000))
        router.push('/login')
    }
    useEffect(() => {
        if (user) {
            toast.success('Register successful!')
            if (user.emailVerified) {
                router.push('/')
            }
            else {
                verifNotif()
            }
        }
    }, [user])

    const { handleSubmit } = methods

    const registerNewAccount = async (data: RegisterProps) => {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password).then((value) => value)
            sendEmailVerification(userCred.user)
            if (!userCred) {
                throw 'Error while Sign In'
            }
        } catch (error) {
            toast.error((error as FirebaseError).message)
        }
    };

    const onSubmit = (data: RegisterProps) => {
        registerNewAccount(data)
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
                        Sign In
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
