import Main from '@/components/layout/main'
import PendaftaranApp from '@/container/pendaftaran/daftar-appdev-container'
import React from 'react'

export default function Page() {
    return (
        <Main>
            <section className="h-full w-full">
                <PendaftaranApp />
            </section>
        </Main>
    )
}
