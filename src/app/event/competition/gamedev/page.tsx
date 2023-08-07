import Main from '@/components/layout/main'
import React from 'react'
import PendaftaranDevCom from '@/container/pendaftaran/page-pendaftaran-container'

const idCabang = 'gamedev'

export default function Page() {

    return (
        <Main>
            <PendaftaranDevCom idCabang={idCabang} />
        </Main>
    )
}
