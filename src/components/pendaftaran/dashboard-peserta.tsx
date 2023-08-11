'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { COMPETITION_MODEL } from '@/constants'
import { DownloadGuidebookButton } from '../button/download-guidebook'
import { StatusBerkas } from '@/utils/enum'
import { StatusBerkasComponent } from './status-berkas'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import LoadingComponent from '../layout/loading'
import { useCountdown } from '@/hooks/useCountdown';

const DashboardPeserta = (props: COMPETITION_MODEL) => {
    const [loading, setLoading] = useState(true)
    const [statusKetua, setStatusKetua] = useState(StatusBerkas.verify)
    const [statusAnggota1, setStatusAnggota1] = useState(StatusBerkas.verify)
    const [statusAnggota2, setStatusAnggota2] = useState(StatusBerkas.verify)
    const [statusPembayaran, setStatusPembayaran] = useState(StatusBerkas.verify)
    const [namaTim, setnamaTim] = useState('')
    const [namaKetua, setNamaKetua] = useState('')
    const [namaAnggota1, setNamaAnggota1] = useState('')
    const [namaAnggota2, setNamaAnggota2] = useState('')
    const [days, hours, minutes] = useCountdown(new Date("2023-09-08"));

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, props.idCabang, user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setStatusKetua(docSnap.data().ketuaVerified)
                    setStatusAnggota1(docSnap.data().anggota1Verified)
                    setStatusAnggota2(docSnap.data().anggota2Verified)
                    setStatusPembayaran(docSnap.data().pembayaranVerified)

                    setnamaTim(docSnap.data().namaTim)
                    setNamaKetua(docSnap.data().namaKetua)
                    setNamaAnggota1(docSnap.data().namaAnggota1)
                    setNamaAnggota2(docSnap.data().namaAnggota2)

                    setLoading(false)
                }
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        loading ? (
            <LoadingComponent />
        ) : (
            <section className='w-3/4 mx-auto py-4 flex flex-col gap-4'>
                <div className='flex flex-col mb-4 gap-5 md:flex-row items-center'>
                    <div className='flex items-center justify-center gap-4'>
                        <Image
                            src={props.logo}
                            width={1}
                            height={1}
                            alt="Logo"
                            className="object-fit h-20 w-20 md:h-28 md:w-28"
                        />
                        <h1>{props.label}</h1>
                    </div>
                    <DownloadGuidebookButton link={props.guidebook} />
                </div>

                <div className='bg-gray-800/70 rounded-xl p-4 h-min flex gap-4 flex-col md:flex-row justify-center md:gap-10'>
                    <h3 className='basis-1/3 my-auto text-center'>Deadline Pengumpulan Proposal</h3>
                    <div className='basis-1/3 h-40 min-h-full flex flex-col'>
                        <div className='flex-1 flex justify-evenly items-center md:gap-5'>
                            <div className='bg-gray-400/20 px-2 py-4 rounded-2xl text-center w-20 min-w-min'>
                                <h1>{days}</h1>
                                <p>Hari</p>
                            </div>
                            <h1>:</h1>
                            <div className='bg-gray-400/20 px-2 py-4 rounded-2xl text-center w-20 min-w-min'>
                                <h1>{hours}</h1>
                                <p>Jam</p>
                            </div>
                            <h1>:</h1>
                            <div className='bg-gray-400/20 px-2 py-4 rounded-2xl text-center w-20 min-w-min'>
                                <h1>{minutes}</h1>
                                <p>Menit</p>
                            </div>
                        </div>
                        <h4 className='text-center'>8 September 2023</h4>
                    </div>
                </div>

                <div className='grid gap-4 md:grid-cols-2 mt-6'>
                    <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
                        <h3>Profil Tim</h3>
                        <hr className='my-2 border-white/50' />
                        <h4 className='mt-6 font-bold'>Nama Tim</h4>
                        <p> {namaTim} </p>
                        <h4 className='mt-6 font-bold'>Nama Ketua</h4>
                        <p> {namaKetua} </p>

                        {namaAnggota1 &&
                            <div>
                                <h4 className='mt-6 font-bold'>Nama Anggota1</h4>
                                <p> {namaAnggota1} </p>
                            </div>
                        }

                        {namaAnggota2 &&
                            <div>
                                <h4 className='mt-6 font-bold'>Nama Anggota2</h4>
                                <p> {namaAnggota2} </p>
                            </div>
                        }
                    </div>
                    <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
                        <h3>Berkas Pendaftaran</h3>
                        <hr className='my-2 border-white/50' />
                        <StatusBerkasComponent nama='Berkas Ketua' status={statusKetua} message='' />
                        {namaAnggota1 &&
                            <StatusBerkasComponent nama='Berkas Anggota 1' status={statusAnggota1} message='' />
                        }
                        {namaAnggota2 &&
                            <StatusBerkasComponent nama='Berkas Anggota 2' status={statusAnggota2} message='' />
                        }
                        <StatusBerkasComponent nama='Berkas Pembayaran' status={statusPembayaran} message='' />
                    </div>
                </div>
            </section>
        )
    )
}

export default DashboardPeserta