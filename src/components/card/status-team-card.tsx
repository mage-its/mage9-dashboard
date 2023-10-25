import { StatusBerkas } from '@/utils/enum'
import idCabangToLabel from '@/utils/idCabangToLabel'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import React from 'react'

interface StatusTeamCardProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
    onClick: () => void
}

const StatusTeamCard = (props: StatusTeamCardProps) => {
    const getOverallTimStatus = (teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        if (teamDoc.data().timVerified) return StatusBerkas.accepted
        if (
            teamDoc.data().pembayaranVerified == StatusBerkas.verify ||
            teamDoc.data().ketuaVerified == StatusBerkas.verify ||
            (teamDoc.data().namaAnggota1 ? teamDoc.data().anggota1Verified == StatusBerkas.verify : false) ||
            (teamDoc.data().namaAnggota2 ? teamDoc.data().anggota2Verified == StatusBerkas.verify : false)
        )
            return StatusBerkas.verify
        return StatusBerkas.upload
    }
    const getTahap2Status = (teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        if (teamDoc.data().berkasTahap2 != null) return StatusBerkas.verify
        return StatusBerkas.upload
    }
    const teamStatus = getOverallTimStatus(props.teamDoc)
    const tahap2Status = getTahap2Status(props.teamDoc)
    return (
        <button
            onClick={() => props.onClick()}
            className="flex items-center rounded-md bg-custom-blue-dark/70 px-4 py-2 text-start"
        >
            <p>{props.teamDoc.data().namaTim}</p>
            <div className="ml-auto flex items-center text-white/20">
                {/* <h4>{idCabangToLabel(props.teamDoc.data().idCabang)} | {props.teamDoc.data().kategori} | {props.teamDoc.data().timId} | </h4> */}
                <h4>Tahap 1: </h4>
                {teamStatus == StatusBerkas.accepted && <div className="ml-2 h-4 w-4 rounded-full bg-emerald-400" />}
                {teamStatus == StatusBerkas.upload && <div className="ml-2 h-4 w-4 rounded-full bg-gray-400" />}
                {teamStatus == StatusBerkas.verify && <div className="ml-2 h-4 w-4 rounded-full bg-yellow-400" />}
                <h4 className="ml-2"> | Tahap 2: </h4>
                {tahap2Status == StatusBerkas.upload && <div className="ml-2 h-4 w-4 rounded-full bg-gray-400" />}
                {tahap2Status == StatusBerkas.verify && <div className="ml-2 h-4 w-4 rounded-full bg-yellow-400" />}
            </div>
        </button>
    )
}

export default StatusTeamCard
