'use client'
import StatusTeamCard from '@/components/card/status-team-card'
import LoadingComponent from '@/components/layout/loading'
import { COMPETITIONS } from '@/constants'
import { db } from '@/utils/firebase'
import { DocumentData, QueryDocumentSnapshot, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import TeamDetailAdminContainer from './team-detail-admin-container'
import { BsChevronDown } from 'react-icons/bs'
import { useIsAdmin } from '@/utils/isAdmin'
import { StatusBerkas } from '@/utils/enum'
import Link from 'next/link'

interface VerifikasiContainerProps {
    tabNumber: number
}

const VerifikasiContainer = (props: VerifikasiContainerProps) => {
    const getOverallTimStatus = (teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        if (teamDoc.data().timVerified) return StatusBerkas.accepted
        if (
            teamDoc.data().pembayaranVerified == StatusBerkas.verify ||
            teamDoc.data().ketuaVerified == StatusBerkas.verify ||
            (teamDoc.data().namaAnggota1 ? teamDoc.data().anggota1Verified == StatusBerkas.verify : false) ||
            (teamDoc.data().namaAnggota2 ? teamDoc.data().anggota2Verified == StatusBerkas.verify : false)
        ) return StatusBerkas.verify
        return StatusBerkas.upload
    }

    const [tab, setTab] = useState(0)
    const [loading, setLoading] = useState(true)
    const [wait, setWait] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [pending, setPending] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [verified, setVerified] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [spam, setSpam] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
    const [openDetail, setOpenDetail] = useState(false)
    const [detailItem, setDetailItem] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>>()
    const [triggerRefresh, setTriggerRefresh] = useState(false)
    const isAdmin = useIsAdmin()

    useEffect(() => {
        setLoading(true)
        const wait: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        const pending: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        const verified: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        const spam: QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
        getDocs(collection(db, COMPETITIONS[0].idCabang)).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().isSpam) {
                    spam.push(doc)
                } else {
                    doc.data().timVerified ? verified.push(doc) : (getOverallTimStatus(doc) == StatusBerkas.verify ? pending.push(doc) : wait.push(doc))
                }
            });
            getDocs(collection(db, COMPETITIONS[1].idCabang)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().isSpam) {
                        spam.push(doc)
                    } else {
                        doc.data().timVerified ? verified.push(doc) : (getOverallTimStatus(doc) == StatusBerkas.verify ? pending.push(doc) : wait.push(doc))
                    }
                });
                getDocs(collection(db, COMPETITIONS[2].idCabang)).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.data().isSpam) {
                            spam.push(doc)
                        } else {
                            doc.data().timVerified ? verified.push(doc) : (getOverallTimStatus(doc) == StatusBerkas.verify ? pending.push(doc) : wait.push(doc))
                        }
                    });
                    getDocs(collection(db, COMPETITIONS[3].idCabang)).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().isSpam) {
                                spam.push(doc)
                            } else {
                                doc.data().timVerified ? verified.push(doc) : (getOverallTimStatus(doc) == StatusBerkas.verify ? pending.push(doc) : wait.push(doc))
                            }
                        });
                        wait.sort((a, b) => {
                            return a.data().time < b.data().time ? -1 : 1
                        })
                        pending.sort((a, b) => {
                            return a.data().time < b.data().time ? -1 : 1
                        })
                        verified.sort((a, b) => {
                            return a.data().time < b.data().time ? -1 : 1
                        })
                        setWait(wait)
                        setPending(pending)
                        setVerified(verified)
                        setSpam(spam)
                        setLoading(false)
                    })
                })
            })
        })
    }, [triggerRefresh])

    return isAdmin ? (
        <div className='p-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                <Link
                    href={`/admin/wait`}
                    className={`flex justify-end items-center p-2 rounded-full flex-1 ${props.tabNumber == 0 && 'bg-custom-blue/80'} text-center`}
                >
                    <h4 className='mx-auto'>Wait</h4>
                    <p className=' bg-custom-blue-dark/50 rounded-full h-7 min-w-[1.75rem] flex items-center justify-center'>
                        {loading ? '...' : wait.length}
                    </p>
                </Link>
                <Link
                    href={`/admin/pending`}
                    className={`flex justify-end items-center p-2 rounded-full flex-1 ${props.tabNumber == 1 && 'bg-custom-blue/80'} text-center`}
                >
                    <h4 className='mx-auto'>Pending</h4>
                    <p className=' bg-custom-blue-dark/50 rounded-full h-7 min-w-[1.75rem] flex items-center justify-center'>
                        {loading ? '...' : pending.length}
                    </p>
                </Link>
                <Link
                    href={`/admin/verifikasi`}
                    className={`flex justify-end items-center p-2 rounded-full flex-1 ${props.tabNumber == 2 && 'bg-custom-blue/80'} text-center`}
                >
                    <h4 className='mx-auto'>Verified</h4>
                    <p className=' bg-custom-blue-dark/50 rounded-full h-7 min-w-[1.75rem] flex items-center justify-center'>
                        {loading ? '...' : verified.length}
                    </p>
                </Link>
                <Link
                    href={`/admin/spam`}
                    className={`flex justify-end items-center p-2 rounded-full flex-1 ${props.tabNumber == 3 && 'bg-custom-blue/80'} text-center`}
                >
                    <h4 className='mx-auto'>Spam</h4>
                    <p className=' bg-custom-blue-dark/50 rounded-full h-7 min-w-[1.75rem] flex items-center justify-center'>
                        {loading ? '...' : spam.length}
                    </p>
                </Link>
            </div>
            <hr />
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    {!openDetail ?
                        <div className='pt-4 grid gap-4'>
                            {(props.tabNumber == 0 ? wait : (props.tabNumber == 1 ? pending : props.tabNumber == 2 ? verified : spam)).map((item) => (
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
                                    setTriggerRefresh(!triggerRefresh)
                                }}
                            >
                                <BsChevronDown
                                    className='rotate-90'
                                />
                                <p className='pr-1'>Back</p>
                            </button>
                            <TeamDetailAdminContainer teamDoc={detailItem!} />
                        </div>
                    }
                </>
            )}
        </div>
    ) : null
}

export default VerifikasiContainer