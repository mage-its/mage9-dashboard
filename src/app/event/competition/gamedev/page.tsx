import Main from '@/components/layout/main'
import React from 'react'
import PendaftaranDevCom from '@/container/pendaftaran/page-pendaftaran-container'
import { COMPETITION_LINK } from '@/constants'

export default function Page() {
    return (
        <Main>
            <PendaftaranDevCom idCabang={COMPETITION_LINK[1].idCabang} guidebook={COMPETITION_LINK[1].guidebook} />
        </Main>
    )
}
