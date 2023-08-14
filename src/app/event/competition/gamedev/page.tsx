import Main from '@/components/layout/main'
import React from 'react'
import DaftarDevComContainer from '@/container/peserta/daftar-devcom-container'
import { COMPETITIONS } from '@/constants'

export default function Page() {
    return (
        <Main>
            <DaftarDevComContainer {...COMPETITIONS[1]} />
        </Main>
    )
}
