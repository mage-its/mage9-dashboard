'use client'
import { useIsAdmin } from '@/utils/isAdmin'
import { COMPETITIONS } from '@/constants'
import TeamCountCard from '@/components/card/jumlah-peserta-card'
import VerifikasiBerkasCard from '@/components/card/verifikasi-berkas-card'
import React from 'react'
import TeamCountCardTahap1 from '@/components/card/jumlah-peserta-card-tahap1'

const AdminContainer = () => {
    const isAdmin = useIsAdmin()

    return isAdmin ? (
        <div className='flex flex-col gap-4 p-4'>
            <h3>Peserta Perlombaan (Verified Only)</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {/* {COMPETITIONS.map((compe) => <TeamCountCard key={compe.id} label={compe.label} idCabang={compe.idCabang} />)} */}
                <TeamCountCard label={COMPETITIONS[3].label} idCabang={COMPETITIONS[3].idCabang} />
            </div>

            <hr />
            <h3>Verifikasi Berkas Tim</h3>
            <VerifikasiBerkasCard />

            <hr />
            <h3>Lolos Tahap 1</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <TeamCountCardTahap1 label={COMPETITIONS[0].label} idCabang={COMPETITIONS[0].idCabang} />
                <TeamCountCardTahap1 label={COMPETITIONS[1].label} idCabang={COMPETITIONS[1].idCabang} />
                <TeamCountCardTahap1 label={COMPETITIONS[2].label} idCabang={COMPETITIONS[2].idCabang} />
            </div>
        </div>
    ) : null
}

export default AdminContainer