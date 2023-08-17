'use client'
import { db } from '@/utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface NominalBayarCardProps {
    idCabang: string,
    kategori: string,
}

const NominalBayarCard = (props: NominalBayarCardProps) => {
    const [biaya, setBiaya] = useState('')

    useEffect(() => {
        const docRef = doc(db, 'biaya', props.idCabang + '_' + props.kategori);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                setBiaya(docSnap.data().biaya)
            }
        })


    }, [])


    return (
        <div className='bg-gray-800/70 rounded-xl p-4 h-min mt-6 text-center'>
            <h4>Nominal yang harus dibayarkan</h4>
            <h3 className='mt-4'>{biaya || '...'}</h3>
        </div>
    )
}

export default NominalBayarCard