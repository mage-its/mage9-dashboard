import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import React from 'react'
import TDACDevCom from './tdac-devcom'
import { COMPETITIONS } from '@/constants'
import TDACRobotics from './tdac-robotics'

interface TeamDetailContainerProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
}

const TeamDetailAdminContainer = (props: TeamDetailContainerProps) => {
    return (
        <>
            {props.teamDoc.data().idCabang == COMPETITIONS[3].idCabang ?
                <TDACRobotics teamDoc={props.teamDoc} />
                :
                <TDACDevCom teamDoc={props.teamDoc} />
            }
        </>
    )
}

export default TeamDetailAdminContainer