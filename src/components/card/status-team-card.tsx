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
            teamDoc.data().pembayaranVerified == StatusBerkas.upload ||
            teamDoc.data().ketuaVerified == StatusBerkas.upload ||
            (teamDoc.data().namaAnggota1 ? teamDoc.data().anggota1Verified == StatusBerkas.accepted : false) ||
            (teamDoc.data().namaAnggota2 ? teamDoc.data().anggota2Verified == StatusBerkas.accepted : false)
        ) return StatusBerkas.upload
        return StatusBerkas.verify
    }
    const teamStatus = getOverallTimStatus(props.teamDoc)
    return (
        <button onClick={() => props.onClick()} className='bg-custom-blue-dark/70 py-2 px-4 rounded-md text-start flex items-center'>
            <p>
                {props.teamDoc.data().namaTim}
            </p>
            <div className='ml-auto text-white/20 flex items-center'>
                <h4>{idCabangToLabel(props.teamDoc.data().idCabang)} | {props.teamDoc.data().kategori} | {props.teamDoc.data().timId} | </h4>
                {teamStatus == StatusBerkas.accepted &&
                    <div className='h-4 w-4 bg-emerald-400 ml-2 rounded-full' />
                }
                {teamStatus == StatusBerkas.upload &&
                    <div className='h-4 w-4 bg-gray-400 ml-2 rounded-full' />
                }
                {teamStatus == StatusBerkas.verify &&
                    <div className='h-4 w-4 bg-yellow-400 ml-2 rounded-full' />
                }
            </div>
        </button>
    )
}

export default StatusTeamCard