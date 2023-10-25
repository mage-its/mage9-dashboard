'use client'
import { db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Tahap2CardAdminProps {
    idCabang: string
    teamId: string
    tahap: number
}

const Tahap2CardAdmin = (props: Tahap2CardAdminProps) => {
    const [uploadTime, setUploadTime] = useState<Date>()
    const [proposal, setProposal] = useState('')

    useEffect(() => {
        const docRef = doc(db, props.idCabang, props.teamId)
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                setUploadTime(new Date(docSnap.data().timeTahap2) ?? null)
                setProposal(docSnap.data().berkasTahap2 ?? '')
            }
        })
    }, [])

    const accept = async () => {
        // setLoading(true)
        // const teamDocRef = doc(db, props.idCabang, props.teamId)
        // try {
        //     await updateDoc(teamDocRef, {
        //         tahap: 1
        //     })
        //     setStatus(StatusBerkas.accepted)
        //     setTahap(1)
        // } catch (error) {
        //     toast.error((error as FirebaseError).message)
        // }
        // setLoading(false)
    }

    const deny = async () => {
        // setLoading(true)
        // const teamDocRef = doc(db, props.idCabang, props.teamId)
        // try {
        //     await updateDoc(teamDocRef, {
        //         isStop: true
        //     })
        //     setStatus(StatusBerkas.denied)
        //     setIsStop(true)
        // } catch (error) {
        //     toast.error((error as FirebaseError).message)
        // }
        // setLoading(false)
    }

    return (
        <div className="h-min rounded-xl bg-gray-800/70 p-4">
            <h4>Tahap 2</h4>
            <hr className="my-2 border-white/50" />

            <h4 className="mb-2 mt-6 font-bold">Link Tahap 2</h4>
            {props.tahap > 0 ? (
                <>
                    {!isNaN(uploadTime?.getTime() ?? NaN) ? (
                        <>
                            <p className="mb-3">
                                Terakhir upload pada{' '}
                                {uploadTime?.toString().substring(0, uploadTime?.toString().indexOf('GMT') - 1)}
                            </p>
                            <div className="flex">
                                <Link
                                    href={proposal}
                                    target="_blank"
                                    className="rounded-full bg-custom-purple px-4 py-2"
                                >
                                    Buka link di sini
                                </Link>
                                {/* <div className='ml-auto'>
                                            <button onClick={() => accept()} className='bg-emerald-400 py-2 px-4 rounded-full text-emerald-900'>
                                                Lolos Tahap 1
                                            </button>
                                            <button onClick={() => deny()} className='ml-4 bg-red-400 py-2 px-4 rounded-full text-red-900'>
                                                Tolak Tahap 1
                                            </button>
                                        </div> */}
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-300">Belum upload</p>
                    )}
                </>
            ) : (
                <p className="text-gray-300">Belum lolos tahap 1</p>
            )}
        </div>
    )
}

export default Tahap2CardAdmin
