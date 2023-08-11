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

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '@/utils/firebase'

export default function GoogleButton() {
    const provider = new GoogleAuthProvider()
    const router = useRouter()

    const [_, user, loading] = useSignInWithGoogle(auth)

    useEffect(() => {
        if (user) {
            toast.success('Login successful!')
            router.push('/')
        }
    }, [])

    const LoginWithGoogle = async () => {
        try {
            let userCred = await signInWithPopup(auth, provider)
            if (userCred) {
                const docSnap = await getDoc(doc(db, "users", userCred.user.uid))
                if (!docSnap.exists()) {
                    await setDoc(doc(db, "users", userCred.user.uid), {
                        name: userCred.user.displayName ?? 'User',
                        admin: false,
                        competition: [],
                    })
                }
            }
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
