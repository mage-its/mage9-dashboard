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

const AppGameTeamListContainerTahap1 = (props: TeamListContainerTahap1Props) => {
    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(true)
    const [siswa, setSiswa] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [mahasiswa, setMahasiswa] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [timSelected, setTimSelected] = useState(0)
    const [openDetail, setOpenDetail] = useState(false)
    const isAdmin = useIsAdmin()

    useEffect(() => {
        setLoading(true)
        const siswa: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        const mahasiswa: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        const q = query(
            collection(db, props.compe.idCabang),
            where('isSpam', '==', false),
            where('timVerified', '==', true),
            where('tahap', '==', 1)
        )

        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.data().kategori == 'Mahasiswa' ? mahasiswa.push(doc) : siswa.push(doc)
            })
            siswa.sort((a, b) => {
                return a.data().time < b.data().time ? -1 : 1
            })
            mahasiswa.sort((a, b) => {
                return a.data().time < b.data().time ? -1 : 1
            })
            setSiswa(siswa)
            setMahasiswa(mahasiswa)
            setLoading(false)
        })
    }, [timSelected])

    return isAdmin ? (
        <div className="p-4">
            <div className="mb-4 grid grid-cols-2 gap-4">
                <button
                    onClick={() => {
                        setTab(0)
                        setOpenDetail(false)
                    }}
                    className={`flex flex-1 items-center justify-end rounded-full p-2 ${
                        tab == 0 && 'bg-custom-blue/80'
                    } text-center`}
                >
                    <h4 className="mx-auto">Siswa</h4>
                    <p className=" flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-custom-blue-dark/50">
                        {loading ? '...' : siswa.length}
                    </p>
                </button>
                <button
                    onClick={() => {
                        setTab(1)
                        setOpenDetail(false)
                    }}
                    className={`flex flex-1 items-center justify-end rounded-full p-2 ${
                        tab == 1 && 'bg-custom-blue/80'
                    } text-center`}
                >
                    <h4 className="mx-auto">Mahasiswa</h4>
                    <p className=" flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-custom-blue-dark/50">
                        {loading ? '...' : mahasiswa.length}
                    </p>
                </button>
            </div>
            <hr />
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    {tab == 0 &&
                        (!openDetail ? (
                            <div className="grid gap-4 pt-4">
                                {siswa.map((item, index) => (
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
                                    {timSelected != siswa.length - 1 && (
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

                                <TeamDetailAdminContainer teamDoc={siswa[timSelected]} />
                            </div>
                        ))}
                    {tab == 1 &&
                        (!openDetail ? (
                            <div className="grid gap-4 pt-4">
                                {mahasiswa.map((item, index) => (
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
                                    {timSelected != mahasiswa.length - 1 && (
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

                                <TeamDetailAdminContainer teamDoc={mahasiswa[timSelected]} />
                            </div>
                        ))}
                </>
            )}
        </div>
    ) : null
}

export default AppGameTeamListContainerTahap1
