'use client'
import StatusTeamCard from '@/components/card/status-team-card'
import LoadingComponent from '@/components/layout/loading'
import { COMPETITION_MODEL } from '@/constants'
import { db } from '@/utils/firebase'
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import TeamDetailAdminContainer from './team-detail-admin-container'
import { useIsAdmin } from '@/utils/isAdmin'

interface RoboticsListContainerProps {
    compe: COMPETITION_MODEL
}

const RoboticsTeamListContainer = (props: RoboticsListContainerProps) => {
    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(true)
    const [smp, setSmp] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [sma, setSma] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [detailItem, setDetailItem] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>>()
    const [openDetail, setOpenDetail] = useState(false)
    const isAdmin = useIsAdmin()

    useEffect(() => {
        setLoading(true)
        const smp: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        const sma: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        const q = query(collection(db, props.compe.idCabang), where('isSpam', '==', false), where('timVerified', '==', true));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.data().kategori == 'SMA' ? sma.push(doc) : smp.push(doc)
            });
            smp.sort((a, b) => {
                return a.data().time < b.data().time ? -1 : 1
            })
            sma.sort((a, b) => {
                return a.data().time < b.data().time ? -1 : 1
            })
            setSmp(smp)
            setSma(sma)
            setLoading(false)
        })
    }, [])

    return isAdmin ? (
        <div className='p-4'>

            <div className='grid grid-cols-2 gap-4 mb-4'>
                <button onClick={() => {
                    setTab(0)
                }}
                    className={`flex justify-end items-center p-2 rounded-full flex-1 ${tab == 0 && 'bg-custom-blue/80'} text-center`}
                >
                    <h4 className='mx-auto'>SMP</h4>
                    <p className=' bg-custom-blue-dark/50 rounded-full h-7 min-w-[1.75rem] flex items-center justify-center'>
                        {loading ? '...' : smp.length}
                    </p>
                </button>
                <button onClick={() => {
                    setTab(1)
                }}
                    className={`flex justify-end items-center p-2 rounded-full flex-1 ${tab == 1 && 'bg-custom-blue/80'} text-center`}
                >
                    <h4 className='mx-auto'>SMA</h4>
                    <p className=' bg-custom-blue-dark/50 rounded-full h-7 min-w-[1.75rem] flex items-center justify-center'>
                        {loading ? '...' : sma.length}
                    </p>
                </button>
            </div>
            <hr />
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    {tab == 0 && (
                        !openDetail ?
                            <div className='pt-4 grid gap-4'>
                                {smp.map((item) => (
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
                    {tab == 1 && (
                        !openDetail ?
                            <div className='pt-4 grid gap-4'>
                                {sma.map((item) => (
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
                </>
            )}
        </div>
    ) : null
}

export default RoboticsTeamListContainer