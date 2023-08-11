import Main from '@/components/layout/main'
import React from 'react'
import DevComPage from '@/container/pendaftaran/devcom-container'
import { COMPETITIONS } from '@/constants'

export default function Page() {
    return (
        <Main>
            <DevComPage {...COMPETITIONS[1]} />
        </Main>
    )
}
