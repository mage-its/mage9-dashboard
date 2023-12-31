'use client'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import Link from 'next/link'

interface TeamCountCardTahap1Props {
    label: string
    idCabang: string
}

const TeamCountCardTahap1 = (props: TeamCountCardTahap1Props) => {
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const q = query(collection(db, props.idCabang), where('isSpam', '==', false), where('timVerified', '==', true), where('tahap', '==', 1));
        getDocs(q).then((querySnapshot) => {
            setCount(querySnapshot.docs.length)
            setLoading(false)
        })
    }, [])

    return (
        <div className='rounded-xl bg-custom-blue/80 p-4'>
            <h4>Jumlah peserta {props.label}</h4>
            <hr />
            <div className='flex items-end gap-2 pt-2'>
                <h1>{loading ? '...' : count}</h1>
                <p>tim</p>
                <Link className='ml-auto rounded-xl mt-2 py-1 px-6 bg-custom-purple/30' href={`/admin/${props.idCabang}/tahap1`}>
                    Lihat
                </Link>
            </div>
        </div>
    )
}

export default TeamCountCardTahap1