'use client'
import { BerkasType, StatusBerkas } from '@/utils/enum'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from '@/utils/firebase'
import { toast } from 'react-hot-toast'
import { FirebaseError } from 'firebase/app'

interface SetStatusBerkasCardProps {
    berkasType: BerkasType
    berkasLink: string
    berkasStatus: StatusBerkas
    idCabang: string
    teamId: string
}

const SetStatusBerkasCard = (props: SetStatusBerkasCardProps) => {
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(StatusBerkas.verify)

    const accept = async () => {
        setLoading(true)
        const teamDocRef = doc(db, props.idCabang, props.teamId)

        try {
            switch (props.berkasType) {
                case BerkasType.pembayaran:
                    await updateDoc(teamDocRef, {
                        pembayaranVerified: StatusBerkas.accepted
                    })
                    break
                case BerkasType.ketua:
                    await updateDoc(teamDocRef, {
                        ketuaVerified: StatusBerkas.accepted
                    })
                    break
                case BerkasType.anggota1:
                    await updateDoc(teamDocRef, {
                        anggota1Verified: StatusBerkas.accepted
                    })
                    break
                case BerkasType.anggota2:
                    await updateDoc(teamDocRef, {
                        anggota2Verified: StatusBerkas.accepted
                    })
                    break
            }
            setStatus(StatusBerkas.accepted)

            // Set Tim to Verified if everything is verified
            await getDoc(teamDocRef).then(async (docSnap) => {
                if (docSnap.exists()) {
                    if (
                        docSnap.data().pembayaranVerified == StatusBerkas.accepted &&
                        docSnap.data().ketuaVerified == StatusBerkas.accepted &&
                        (docSnap.data().namaAnggota1 ? docSnap.data().anggota1Verified == StatusBerkas.accepted : true) &&
                        (docSnap.data().namaAnggota2 ? docSnap.data().anggota2Verified == StatusBerkas.accepted : true)
                    ) {
                        await updateDoc(teamDocRef, {
                            timVerified: true
                        })
                    }
                }
            })
        } catch (error) {
            toast.error((error as FirebaseError).message)
        }
        setLoading(false)
    }

    const deny = async () => {
        setLoading(true)
        const teamDocRef = doc(db, props.idCabang, props.teamId)

        const deniedMessage = prompt("Anda akan menolak berkas ini\nPeserta harus mengirim ulang berkas\n\nBerikan alasan penolakan")

        if (deniedMessage) {
            try {
                switch (props.berkasType) {
                    case BerkasType.pembayaran:
                        await updateDoc(teamDocRef, {
                            pembayaranVerified: StatusBerkas.denied,
                            pembayaranDeniedMessage: deniedMessage
                        })
                        break
                    case BerkasType.ketua:
                        await updateDoc(teamDocRef, {
                            ketuaVerified: StatusBerkas.denied,
                            ketuaDeniedMessage: deniedMessage
                        })
                        break
                    case BerkasType.anggota1:
                        await updateDoc(teamDocRef, {
                            anggota1Verified: StatusBerkas.denied,
                            anggota1DeniedMessage: deniedMessage
                        })
                        break
                    case BerkasType.anggota2:
                        await updateDoc(teamDocRef, {
                            anggota2Verified: StatusBerkas.denied,
                            anggota2DeniedMessage: deniedMessage
                        })
                        break
                }
                setStatus(StatusBerkas.denied)
            } catch (error) {
                toast.error((error as FirebaseError).message)
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        setStatus(props.berkasStatus)
        setLoading(false)
    }, [])


    return (
        <div className='flex flex-col md:flex-row gap-2 items-start mt-2'>
            {status != StatusBerkas.upload && <Link href={props.berkasLink} target='_blank' className=' bg-custom-purple py-2 px-4 rounded-full'>
                Lihat di sini
            </Link>}
            {loading ? (
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
            )}
        </div>
    )
}

export default SetStatusBerkasCard