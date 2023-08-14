import Main from '@/components/layout/main'
import { COMPETITIONS } from '@/constants'
import AppGameTeamListContainer from '@/container/admin/app-game-team-list-container'
import React from 'react'

const AppDevTeamList = () => {
    return (
        <Main>
            <AppGameTeamListContainer compe={COMPETITIONS[0]} />
        </Main>
    )
}

export default AppDevTeamList