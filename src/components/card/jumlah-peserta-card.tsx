'use client'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/utils/firebase'

interface TeamCountCardProps {
    label: string
    idCabang: string
}

const TeamCountCard = (props: TeamCountCardProps) => {
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)

    useEffect(() => {
        getDocs(collection(db, props.idCabang)).then((querySnapshot) => {
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
                <button className='ml-auto rounded-xl mt-2 py-1 px-6 bg-custom-purple/30'>Lihat</button>
            </div>
        </div>
    )
}

export default TeamCountCard