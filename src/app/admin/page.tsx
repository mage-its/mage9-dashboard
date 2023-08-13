import { COMPETITIONS } from '@/constants'
import TeamCountCard from '@/components/card/jumlah-peserta-card'
import Main from '@/components/layout/main'
import React from 'react'
import VerifikasiBerkasCard from '@/components/card/verifikasi-berkas-card'

const AdminPage = () => {
    return (
        <Main>
            <div className='flex flex-col gap-4 p-4'>
                <h3>Peserta Perlombaan</h3>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {COMPETITIONS.map((compe) => <TeamCountCard key={compe.id} label={compe.label} idCabang={compe.idCabang} />)}
                </div>
                <hr />
                <h3>Verifikasi Berkas Tim</h3>
                <VerifikasiBerkasCard />
            </div>
        </Main>
    )
}

export default AdminPage