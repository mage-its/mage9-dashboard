'use client'
import { COMPETITIONS } from '@/constants'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import Link from 'next/link'

const VerifikasiBerkasCard = () => {
    const [pending, setPending] = useState(0)
    const [verified, setVerified] = useState(0)
    const [spam, setSpam] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let pending = 0
        let verified = 0
        let spam = 0
        getDocs(collection(db, COMPETITIONS[0].idCabang)).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.data().isSpam ? spam++ : doc.data().timVerified ? verified++ : pending++
            });
            getDocs(collection(db, COMPETITIONS[1].idCabang)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.data().isSpam ? spam++ : doc.data().timVerified ? verified++ : pending++
                });
                getDocs(collection(db, COMPETITIONS[2].idCabang)).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.data().isSpam ? spam++ : doc.data().timVerified ? verified++ : pending++
                    });
                    getDocs(collection(db, COMPETITIONS[3].idCabang)).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            doc.data().isSpam ? spam++ : doc.data().timVerified ? verified++ : pending++
                        });
                        setSpam(spam)
                        setPending(pending)
                        setVerified(verified)
                        setLoading(false)
                    })
                })
            })
        })
    }, [])

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='rounded-xl bg-custom-blue/80 p-4'>
                <h4>Pending</h4>
                <hr />
                <div className='flex items-end gap-2 pt-2'>
                    <h1>{loading ? '...' : pending}</h1>
                    <p>tim</p>
                    <Link href='/admin/verifikasi' className='ml-auto'>
                        <button className='rounded-xl mt-2 py-1 px-6 bg-custom-purple/30'>Lihat</button>
                    </Link>
                </div>
            </div>
            <div className='rounded-xl bg-custom-blue/80 p-4'>
                <h4>Verified</h4>
                <hr />
                <div className='flex items-end gap-2 pt-2'>
                    <h1>{loading ? '...' : verified}</h1>
                    <p>tim</p>
                    <Link href='/admin/verifikasi' className='ml-auto'>
                        <button className='rounded-xl mt-2 py-1 px-6 bg-custom-purple/30'>Lihat</button>
                    </Link>
                </div>
            </div>
            <div className='rounded-xl bg-custom-blue/80 p-4'>
                <h4>Spam</h4>
                <hr />
                <div className='flex items-end gap-2 pt-2'>
                    <h1>{loading ? '...' : spam}</h1>
                    <p>tim</p>
                    <Link href='/admin/verifikasi' className='ml-auto'>
                        <button className='rounded-xl mt-2 py-1 px-6 bg-custom-purple/30'>Lihat</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifikasiBerkasCard