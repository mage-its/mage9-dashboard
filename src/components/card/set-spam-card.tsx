'use client'
import { db } from '@/utils/firebase'
import { DocumentData, QueryDocumentSnapshot, doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'

interface SetSpamCardProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
}

const SetSpamCard = (props: SetSpamCardProps) => {
    const [loading, setLoading] = useState(false)
    const [spam, setSpam] = useState(props.teamDoc.data().isSpam)

    const setIsSpam = async () => {
        setLoading(true)
        const userRef = doc(db, props.teamDoc.data().idCabang, props.teamDoc.id);

        await updateDoc(userRef, {
            isSpam: !props.teamDoc.data().isSpam
        });
        setSpam(!spam)
        setLoading(false)
    }

    return (
        <button onClick={setIsSpam} className={`${!spam ? 'bg-red-400/80 text-red-900' : 'bg-emerald-400/80 text-emerald-900'} py-2 px-4 rounded-full h-min font-bold`}>
            {loading ? (
                '...'
            ) : (
                `Mark as ${spam ? 'NOT' : ''} spam`
            )}
        </button>
    )
}

export default SetSpamCard