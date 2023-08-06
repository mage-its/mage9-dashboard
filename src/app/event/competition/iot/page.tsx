'use client'
import Main from '@/components/layout/main'
import PendaftaranDevCom from '@/container/pendaftaran/daftar-devcom-container'
import React, { useState, useEffect } from 'react'
import { db, auth } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'

const idCabang = 'iot'

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setIsVerified(user.emailVerified);

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
                ) : isVerified ?
                    (
                        isRegistered ? (
                            <h1 className="h-full w-full flex justify-center items-center text-center">
                                Anda telah terdaftar pada perlombaan IoT!  Harap tunggu proses verifikasi!
                            </h1>
                        ) : (
                            <PendaftaranDevCom idCabang={idCabang} />
                        )
                    ) : (
                        <h1 className="h-full w-full flex justify-center items-center">
                            Harap verifikasi email anda terlebih dahulu!
                        </h1>
                    )
                }
            </section>
        </Main>
    )
}
