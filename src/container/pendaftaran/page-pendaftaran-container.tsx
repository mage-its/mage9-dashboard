'use client'
import Main from '@/components/layout/main'
import FormDevCom from '@/container/pendaftaran/daftar-devcom-container'
import React, { useState, useEffect } from 'react'
import { db, auth } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Loading from '@/app/loading'

interface PendaftaranDevComProps {
    idCabang: string;
}

export default function PendaftaranDevCom(props: PendaftaranDevComProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, props.idCabang, user.uid);

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
        <section className="h-full w-full">
            {isLoading ? (
                <Loading></Loading>
            ) : (
                isRegistered ? (
                    <h1 className="h-full w-full flex justify-center items-center text-center">
                        Anda telah terdaftar pada {
                            props.idCabang == 'appdev' ? 'AppDev' :
                                props.idCabang == 'gamedev' ? 'GameDev' :
                                    props.idCabang == 'iot' ? 'IoT' :
                                        'Error'
                        }! Harap tunggu proses verifikasi!
                    </h1>
                ) : (
                    <FormDevCom idCabang={props.idCabang} />
                )
            )}
        </section>
    )
}