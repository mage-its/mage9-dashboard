/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { FcGoogle } from 'react-icons/fc'
import { ImSpinner8 } from 'react-icons/im'
import { toast } from 'react-hot-toast'
import React, { useEffect } from 'react'
import { auth } from '@/utils/firebase'
import { FirebaseError } from 'firebase/app'

export default function GoogleButton() {
    const provider = new GoogleAuthProvider()
    const router = useRouter()

    const [_, user, loading] = useSignInWithGoogle(auth)

    useEffect(() => {
        if (user) {
            toast.success('Login successful!')
            router.push('/')
        }
    }, [user, router])

    const LoginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            // const token = await result.user.getIdToken()
            // console.log('TokenID', token)
        } catch (error) {
            toast.error((error as FirebaseError).message, {
                position: 'top-center',
                duration: 3000,
            })
        }
    }

    return (
        <div>
            <button className="rounded bg-white px-5 py-1.5 text-black hover:bg-white/70" onClick={LoginWithGoogle}>
                {loading ? (
                    <div className="inline-flex items-center gap-2.5">
                        <ImSpinner8 className="animate-spin" />
                        Loading...
                    </div>
                ) : (
                    <div className="inline-flex items-center gap-2.5">
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </div>
                )}
            </button>
        </div>
    )
}
