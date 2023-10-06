import Main from '@/components/layout/main'
import { COMPETITIONS } from '@/constants'
import AppGameTeamListContainerTahap1 from '@/container/admin/app-game-team-list-container-tahap1'
import React from 'react'

const GameDevTeamList = () => {
    return (
        <Main>
            <AppGameTeamListContainerTahap1 compe={COMPETITIONS[1]} />
        </Main>
    )
}

export default GameDevTeamList