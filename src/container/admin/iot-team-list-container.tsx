'use client'
import StatusTeamCard from '@/components/card/status-team-card'
import LoadingComponent from '@/components/layout/loading'
import { COMPETITION_MODEL } from '@/constants'
import { db } from '@/utils/firebase'
import { DocumentData, QueryDocumentSnapshot, collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import TeamDetailAdminContainer from './team-detail-admin-container'

interface TeamListContainerProps {
    compe: COMPETITION_MODEL
}

const IoTTeamListContainer = (props: TeamListContainerProps) => {
    const [loading, setLoading] = useState(true)
    const [umum, setUmum] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [detailItem, setDetailItem] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>>()
    const [openDetail, setOpenDetail] = useState(false)

    useEffect(() => {
        setLoading(true)
        const umum: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        getDocs(collection(db, props.compe.idCabang)).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                umum.push(doc)
            });
            setUmum(umum)
            setLoading(false)
        })
    }, [])

    return (
        <div className='p-4'>
            <div className='w-1/2 flex justify-end items-center p-2 rounded-full flex-1 bg-custom-blue/80 text-center mb-4'>
                <h4 className='mx-auto'>Umum</h4>
                <p className=' bg-custom-blue-dark/50 rounded-full h-7 min-w-[1.75rem] flex items-center justify-center'>
                    {loading ? '...' : umum.length}
                </p>
            </div>
            <hr />
            {loading ? (
                <LoadingComponent />
            ) : (
                !openDetail ?
                    <div className='pt-4 grid gap-4'>
                        {umum.map((item) => (
                            <StatusTeamCard
                                key={item.id + item.data().idCabang}
                                teamDoc={item}
                                onClick={() => {
                                    setOpenDetail(true)
                                    setDetailItem(item)
                                }}
                            />
                        ))}
                    </div>
                    :
                    <div className='pt-4'>
                        <button
                            className='mb-4 flex items-center gap-2 bg-custom-blue-dark/50 py-1 px-2 rounded-full'
                            onClick={() => {
                                setOpenDetail(false)
                            }}
                        >
                            <BsChevronDown
                                className='rotate-90'
                            />
                            <p className='pr-1'>Back</p>
                        </button>
                        <TeamDetailAdminContainer teamDoc={detailItem!} />
                    </div>
            )}
        </div>
    )
}

export default IoTTeamListContainer