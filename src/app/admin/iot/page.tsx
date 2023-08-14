import Main from '@/components/layout/main'
import { COMPETITIONS } from '@/constants'
import IoTTeamListContainer from '@/container/admin/iot-team-list-container'
import React from 'react'

const GameDevTeamList = () => {
    return (
        <Main>
            <IoTTeamListContainer compe={COMPETITIONS[2]} />
        </Main>
    )
}

export default GameDevTeamList