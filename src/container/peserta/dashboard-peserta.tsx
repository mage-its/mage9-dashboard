'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { COMPETITION_MODEL } from '@/constants'
import { DownloadGuidebookButton } from '../../components/button/download-guidebook'
import { DocumentData, QueryDocumentSnapshot, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import LoadingComponent from '../../components/layout/loading'
import DeadlineReminderCard from '../../components/card/deadline-reminder-card'
import DetailTim from '@/components/pendaftaran/detail-tim'
import NominalBayarCard from '@/components/card/nominal-bayar-card'
import Tahap1Card from '@/components/card/tahap-1-card'
import { StatusBerkas } from '@/utils/enum'
import Tahap2Card from '@/components/card/tahap-2-card'

const DashboardPeserta = (props: COMPETITION_MODEL) => {
    const [loading, setLoading] = useState(true)
    const [teamDoc, setTeamDoc] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, props.idCabang, user.uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setTeamDoc(docSnap)

                    setLoading(false)
                }
            }
        })

        return () => unsubscribe()
    }, [])

    return loading ? (
        <LoadingComponent />
    ) : (
        <section className="mx-auto flex w-3/4 flex-col gap-4 py-4">
            <div className="mb-4 flex flex-col items-center gap-5 md:flex-row">
                <div className="flex items-center justify-center gap-4">
                    <Image
                        src={props.logo}
                        width={1}
                        height={1}
                        alt="Logo"
                        className="object-fit h-20 w-20 md:h-28 md:w-28"
                    />
                    <h1>{props.label}</h1>
                </div>
                <DownloadGuidebookButton link={props.guidebook} />
            </div>

            <DeadlineReminderCard
                label="Deadline Pengumpulan Link Devcom"
                date="2023-11-03"
                dateString="3 November 2023"
            />

            {(teamDoc!.data().pembayaranVerified == StatusBerkas.upload ||
                teamDoc!.data().pembayaranVerified == StatusBerkas.denied) && (
                <NominalBayarCard
                    idCabang={props.idCabang}
                    kategori={teamDoc!.data().kategori}
                    teamId={teamDoc!.data().timId}
                />
            )}

            <Tahap1Card
                idCabang={props.idCabang}
                teamId={teamDoc!.id}
                teamName={teamDoc!.data().namaTim}
                tahap={teamDoc!.data().tahap}
                isStop={teamDoc!.data().isStop}
            />

            {teamDoc!.data().tahap >= 1 && (
                <Tahap2Card
                    idCabang={props.idCabang}
                    teamId={teamDoc!.id}
                    teamName={teamDoc!.data().namaTim}
                    tahap={teamDoc!.data().tahap}
                    isStop={teamDoc!.data().isStop}
                    linkTahap2={teamDoc!.data().berkasTahap2}
                />
            )}

            <DetailTim teamDoc={teamDoc!} idCabang={props.idCabang} />
        </section>
    )
}

export default DashboardPeserta
