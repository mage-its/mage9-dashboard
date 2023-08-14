import Main from '@/components/layout/main'
import { COMPETITIONS } from '@/constants'
import AppGameTeamListContainer from '@/container/admin/app-game-team-list-container'
import React from 'react'

const GameDevTeamList = () => {
    return (
        <Main>
            <AppGameTeamListContainer compe={COMPETITIONS[1]} />
        </Main>
    )
}

export default GameDevTeamList