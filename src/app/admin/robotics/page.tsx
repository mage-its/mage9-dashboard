import Main from '@/components/layout/main'
import { COMPETITIONS } from '@/constants'
import RoboticsTeamListContainer from '@/container/admin/robotics-team-list-container'
import React from 'react'

const RoboticsTeamList = () => {
    return (
        <Main>
            <RoboticsTeamListContainer compe={COMPETITIONS[3]} />
        </Main>
    )
}

export default RoboticsTeamList