'use client'
import { StatusBerkas } from '@/utils/enum'
import { db } from '@/utils/firebase'
import { FirebaseError } from 'firebase/app'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Tahap1CardAdminProps {
    idCabang: string
    teamId: string
    isStop: boolean
    tahap: number
}

const Tahap1CardAdmin = (props: Tahap1CardAdminProps) => {
    const [uploadTime, setUploadTime] = useState<Date>()
    const [proposal, setProposal] = useState('')
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(StatusBerkas.verify)
    const [isStop, setIsStop] = useState(false)
    const [tahap, setTahap] = useState(0)

    useEffect(() => {
        const docRef = doc(db, props.idCabang, props.teamId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                setUploadTime(new Date(docSnap.data().timeTahap1))
                setProposal(docSnap.data().berkasTahap1)

                if (props.tahap != 0) {
                    setStatus(StatusBerkas.accepted)
                } else {
                    if (props.isStop) {
                        setStatus(StatusBerkas.denied)
                    }
                }
            }
            setIsStop(props.isStop)
            setTahap(props.tahap)
            setLoading(false)
        });
    }, [])

    const accept = async () => {
        setLoading(true)
        const teamDocRef = doc(db, props.idCabang, props.teamId)

        try {
            await updateDoc(teamDocRef, {
                tahap: 1
            })
            setStatus(StatusBerkas.accepted)
            setTahap(1)
        } catch (error) {
            toast.error((error as FirebaseError).message)
        }
        setLoading(false)
    }

    const deny = async () => {
        setLoading(true)
        const teamDocRef = doc(db, props.idCabang, props.teamId)

        try {
            await updateDoc(teamDocRef, {
                isStop: true
            })
            setStatus(StatusBerkas.denied)
            setIsStop(true)
        } catch (error) {
            toast.error((error as FirebaseError).message)
        }
        setLoading(false)
    }

    return (
        <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
            <h4>Tahap 1</h4>
            <hr className='my-2 border-white/50' />

            <h4 className='mt-6 font-bold mb-2'>Proposal Tahap 1</h4>
            {!isNaN(uploadTime?.getTime() ?? NaN) ?
                (
                    <>
                        <p className='mb-3'>Terakhir upload pada {uploadTime?.toString().substring(0, uploadTime?.toString().indexOf('GMT') - 1)}</p>
                        <div className='flex'>
                            <Link href={proposal} target='_blank' className='bg-custom-purple py-2 px-4 rounded-full'>
                                Download di sini
                            </Link>
                            <div className='ml-auto'>
                                {loading ? (
                                    <div className='my-auto mx-auto'>
                                        <svg className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500" viewBox="0 0 24 24" />
                                    </div>
                                ) : (
                                    <>
                                        {isStop || tahap != 0 ?
                                            (
                                                <>
                                                    {status == StatusBerkas.accepted && <div className='md:ml-auto bg-emerald-400/50 py-2 px-4 rounded-full text-emerald-900'>
                                                        Lolos Tahap 1
                                                    </div>}
                                                    {status == StatusBerkas.denied && <div className='md:ml-auto bg-red-400/50 py-2 px-4 rounded-full text-red-950'>
                                                        Tidak Lolos Tahap 1
                                                    </div>}
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => accept()} className='bg-emerald-400 py-2 px-4 rounded-full text-emerald-900'>
                                                        Lolos Tahap 1
                                                    </button>
                                                    <button onClick={() => deny()} className='ml-4 bg-red-400 py-2 px-4 rounded-full text-red-900'>
                                                        Tolak Tahap 1
                                                    </button>
                                                </>
                                            )
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p className='text-gray-300'>Belum upload</p>
                )
            }









            {/* {loading ? (
                <div className='my-auto mx-auto'>
                    <svg className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500" viewBox="0 0 24 24" />
                </div>
            ) : (
                <>
                    {status == StatusBerkas.verify && <div className='md:ml-auto flex gap-2'>
                        <button onClick={() => accept()} className='bg-emerald-400 py-2 px-4 rounded-full text-emerald-900'>
                            Terima
                        </button>
                        <button onClick={() => deny()} className='bg-red-400 py-2 px-4 rounded-full text-red-900'>
                            Tolak
                        </button>
                    </div>}
                    {status == StatusBerkas.accepted && <div className='md:ml-auto bg-emerald-400/50 py-2 px-4 rounded-full text-emerald-900'>
                        Diterima
                    </div>}
                    {status == StatusBerkas.denied && <div className='md:ml-auto bg-red-400/50 py-2 px-4 rounded-full text-red-950'>
                        Ditolak, tunggu peserta mengirim ulang
                    </div>}
                    {status == StatusBerkas.upload && <div className='bg-gray-400/50 py-2 px-4 rounded-full text-gray-200'>
                        Tunggu peserta untuk mengirim berkas
                    </div>}
                </>
            )} */}













        </div>
    )
}

export default Tahap1CardAdmin