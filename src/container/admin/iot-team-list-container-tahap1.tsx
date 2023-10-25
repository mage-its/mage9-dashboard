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

interface TeamListContainerTahap1Props {
    compe: COMPETITION_MODEL
}

const IoTTeamListContainerTahap1 = (props: TeamListContainerTahap1Props) => {
    const [loading, setLoading] = useState(true)
    const [umum, setUmum] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [timSelected, setTimSelected] = useState(0)
    const [openDetail, setOpenDetail] = useState(false)
    const isAdmin = useIsAdmin()

    useEffect(() => {
        setLoading(true)
        const umum: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        const q = query(
            collection(db, props.compe.idCabang),
            where('isSpam', '==', false),
            where('timVerified', '==', true),
            where('tahap', '==', 1)
        )
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                umum.push(doc)
            })
            umum.sort((a, b) => {
                return a.data().time < b.data().time ? -1 : 1
            })
            setUmum(umum)
            setLoading(false)
        })
    }, [timSelected])

    return isAdmin ? (
        <div className="p-4">
            <div className="mb-4 flex w-1/2 flex-1 items-center justify-end rounded-full bg-custom-blue/80 p-2 text-center">
                <h4 className="mx-auto">Umum</h4>
                <p className=" flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-custom-blue-dark/50">
                    {loading ? '...' : umum.length}
                </p>
            </div>
            <hr />
            {loading ? (
                <LoadingComponent />
            ) : !openDetail ? (
                <div className="grid gap-4 pt-4">
                    {umum.map((item, index) => (
                        <StatusTeamCard
                            key={item.id + item.data().idCabang}
                            teamDoc={item}
                            onClick={() => {
                                setOpenDetail(true)
                                setTimSelected(index)
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="pt-4">
                    <button
                        className="mb-4 flex items-center gap-2 rounded-full bg-custom-blue-dark/50 px-2 py-1"
                        onClick={() => {
                            setOpenDetail(false)
                        }}
                    >
                        <BsChevronDown className="rotate-90" />
                        <p className="pr-1">Back</p>
                    </button>

                    <div className="flex gap-4">
                        {timSelected != 0 && (
                            <button
                                className="mb-4 flex items-center gap-2 rounded-full bg-custom-blue-dark/50 px-4 py-1"
                                onClick={() => {
                                    setTimSelected(timSelected - 1)
                                }}
                            >
                                <BsChevronDown className="rotate-90" />
                                <p className="pr-1">Previous Team</p>
                            </button>
                        )}
                        {timSelected != umum.length - 1 && (
                            <button
                                className=" mb-4 flex items-center justify-end gap-2 rounded-full bg-custom-blue-dark/50 px-4 py-1"
                                onClick={() => {
                                    setTimSelected(timSelected + 1)
                                }}
                            >
                                <p className="pr-1">Next Team</p>
                                <BsChevronDown className="-rotate-90" />
                            </button>
                        )}
                    </div>

                    <TeamDetailAdminContainer teamDoc={umum[timSelected]} />
                </div>
            )}
        </div>
    ) : null
}

export default IoTTeamListContainerTahap1
