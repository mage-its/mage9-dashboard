'use client'
import { db } from '@/utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface NominalBayarCardProps {
    idCabang: string,
    kategori: string,
    teamId: string,
}

const NominalBayarCard = (props: NominalBayarCardProps) => {
    const [biaya, setBiaya] = useState('')

    useEffect(() => {
        const docRef = doc(db, 'biaya', props.idCabang + '_' + props.kategori);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                setBiaya(docSnap.data().biaya.slice(0, -3) + props.teamId.slice(-3))
            }
        })


    }, [])


    return (
        <div className='bg-gray-800/70 rounded-xl p-4 h-min mt-6 text-center'>
            <h4>Nominal Pembayaran</h4>
            <h3 className='mt-2'>{biaya || '...'}</h3>
            <p className='mt-2 text-red-400'>*Harap perhatikan 3 digit terakhir nominal pembayaran!</p>
        </div>
    )
}

export default NominalBayarCard