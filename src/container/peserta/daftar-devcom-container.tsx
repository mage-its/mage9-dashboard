'use client'
import FormDevCom from '@/components/form/form-devcom'
import React, { useEffect, useState } from 'react'
import { auth, db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Loading from '@/app/loading'
import DashboardPeserta from './dashboard-peserta'
import { COMPETITION_MODEL } from '@/constants'
import DashboardPesertaRobotic from './dashboard-peserta-robotic'

export default function DaftarDevComContainer(props: COMPETITION_MODEL) {
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, props.idCabang, user.uid);

                const docSnapshot = await getDoc(docRef);
                setIsRegistered(docSnapshot.exists());
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <section className="w-full">
            {isLoading ? (
                <Loading></Loading>
            ) : (
                isRegistered ? (
                    <>
                        {props.id == 4 ?
                            <DashboardPesertaRobotic {...props} />
                            :
                            <DashboardPeserta {...props} />
                        }
                    </>
                ) : (
                    <>
                        {props.id == 4 ?
                            <FormDevCom {...props} />
                            :
                            <section className=" h-[80vh] w-full">
                                <h1 className='h-full w-full flex justify-center items-center'>Maaf, Pendaftaran DevCom telah ditutup!</h1>
                            </section>
                        }
                    </>
                )
            )}
        </section>
    )
}