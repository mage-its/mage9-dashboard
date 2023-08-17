'use client'
import { db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Tahap1CardAdminProps {
    idCabang: string
    teamId: string
}

const Tahap1CardAdmin = (props: Tahap1CardAdminProps) => {
    const [uploadTime, setUploadTime] = useState<Date>()
    const [proposal, setProposal] = useState('')

    useEffect(() => {
        const docRef = doc(db, props.idCabang, props.teamId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                setUploadTime(new Date(docSnap.data().timeTahap1))
                setProposal(docSnap.data().berkasTahap1)
            }
        });
    }, [])


    return (
        <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
            <h4>Tahap 1</h4>
            <hr className='my-2 border-white/50' />

            <h4 className='mt-6 font-bold mb-2'>Proposal Tahap 1</h4>
            {!isNaN(uploadTime?.getTime() ?? NaN) ?
                <>
                    <p className='mb-3'>Terakhir upload pada {uploadTime?.toString().substring(0, uploadTime?.toString().indexOf('GMT') - 1)}</p>
                    <Link href={proposal} target='_blank' className='bg-custom-purple py-2 px-4 rounded-full'>
                        Download di sini
                    </Link>
                </> :
                <p className='text-gray-300'>Belum upload</p>
            }
        </div>
    )
}

export default Tahap1CardAdmin