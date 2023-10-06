import Main from '@/components/layout/main'
import { COMPETITIONS } from '@/constants'
import DaftarDevComContainer from '@/container/peserta/daftar-devcom-container'
import React from 'react'

export default function Page() {
    return (
        <Main>
            {/* <section className="h-full w-full">
                <h1 className='h-full w-full flex justify-center items-center'>Coming Soon!</h1>
            </section> */}
            <DaftarDevComContainer {...COMPETITIONS[3]} />
        </Main>
    )
}
