import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import React from 'react'

interface StatusTeamCardProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
    onClick: () => void
}

const StatusTeamCard = (props: StatusTeamCardProps) => {
    return (
        <button onClick={() => props.onClick()} className='bg-custom-blue-dark/70 py-2 px-4 rounded-md text-start flex items-center'>
            <p>
                {props.teamDoc.data().namaTim}
            </p>
            <h4 className='ml-auto text-white/20'>{props.teamDoc.data().idCabang}</h4>
        </button>
    )
}

export default StatusTeamCard