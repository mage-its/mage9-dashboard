'use client'
import { useIsAdmin } from '@/utils/isAdmin'
import { COMPETITIONS } from '@/constants'
import TeamCountCard from '@/components/card/jumlah-peserta-card'
import VerifikasiBerkasCard from '@/components/card/verifikasi-berkas-card'
import React from 'react'

const AdminContainer = () => {
    const isAdmin = useIsAdmin()

    return isAdmin ? (
        <div className='flex flex-col gap-4 p-4'>
            <h3>Peserta Perlombaan (Verified Only)</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {COMPETITIONS.map((compe) => <TeamCountCard key={compe.id} label={compe.label} idCabang={compe.idCabang} />)}
            </div>
            <hr />
            <h3>Verifikasi Berkas Tim</h3>
            <VerifikasiBerkasCard />
        </div>
    ) : null
}

export default AdminContainer