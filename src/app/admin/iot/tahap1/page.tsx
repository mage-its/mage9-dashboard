import Main from '@/components/layout/main'
import { COMPETITIONS } from '@/constants'
import IoTTeamListContainerTahap1 from '@/container/admin/iot-team-list-container-tahap1'
import React from 'react'

const GameDevTeamList = () => {
    return (
        <Main>
            <IoTTeamListContainerTahap1 compe={COMPETITIONS[2]} />
        </Main>
    )
}

export default GameDevTeamList