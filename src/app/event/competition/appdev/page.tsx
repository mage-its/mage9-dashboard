'use client'
import Main from '@/components/layout/main'
import PendaftaranDevCom from '@/container/pendaftaran/daftar-devcom-container'
import React, { useState, useEffect } from 'react'
import { db, auth } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'

const idCabang = 'appdev'

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, idCabang, user.uid);

                try {
                    const docSnapshot = await getDoc(docRef);
                    setIsRegistered(docSnapshot.exists());
                    setIsLoading(false);
                } catch (error) {
                    throw error
                }
            } else {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <Main>
            <section className="h-full w-full">
                {isLoading ? (
                    <h1 className="h-full w-full flex justify-center items-center">
                        Loading...
                    </h1>
                ) : isRegistered ? (
                    <h1 className="h-full w-full flex justify-center items-center">
                        Anda telah terdaftar pada AppDev!
                    </h1>
                ) : (
                    <PendaftaranDevCom cabang={idCabang} />
                )}
            </section>
        </Main>
    )
}
