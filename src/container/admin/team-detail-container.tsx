import SetStatusBerkasCard from '@/components/card/set-status-berkas-card'
import { BerkasType } from '@/utils/enum'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import React from 'react'

interface TeamDetailContainerProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
}

const TeamDetailContainer = (props: TeamDetailContainerProps) => {
    return (
        <div className='grid gap-4 md:grid-cols-2'>
            <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
                <h4>Profil Tim</h4>
                <hr className='my-2 border-white/50' />

                <h4 className='mt-6 font-bold'>Cabang Perlombaan</h4>
                <p> {props.teamDoc.data().idCabang} </p>

                <h4 className='mt-6 font-bold'>Nama Tim</h4>
                <p> {props.teamDoc.data().namaTim} </p>

                <h4 className='mt-6 font-bold'>Nama Ketua</h4>
                <p> {props.teamDoc.data().namaKetua} </p>

                {props.teamDoc.data().namaAnggota1 &&
                    <div>
                        <h4 className='mt-6 font-bold'>Nama Anggota1</h4>
                        <p> {props.teamDoc.data().namaAnggota1} </p>
                    </div>
                }

                {props.teamDoc.data().namaAnggota2 &&
                    <div>
                        <h4 className='mt-6 font-bold'>Nama Anggota2</h4>
                        <p> {props.teamDoc.data().namaAnggota2} </p>
                    </div>
                }
            </div>
            <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
                <h4>Berkas Pendaftaran</h4>
                <hr className='my-2 border-white/50' />

                <h4 className='mt-6 font-bold'>Bukti Pembayaran</h4>
                <SetStatusBerkasCard
                    berkasType={BerkasType.pembayaran}
                    berkasLink={props.teamDoc.data().buktiPembayaran}
                    berkasStatus={props.teamDoc.data().pembayaranVerified}
                    teamId={props.teamDoc.id}
                    idCabang={props.teamDoc.data().idCabang}
                />

                <h4 className='mt-6 font-bold'>Berkas Ketua</h4>
                <SetStatusBerkasCard
                    berkasType={BerkasType.ketua}
                    berkasLink={props.teamDoc.data().identitasKetua}
                    berkasStatus={props.teamDoc.data().ketuaVerified}
                    teamId={props.teamDoc.id}
                    idCabang={props.teamDoc.data().idCabang}
                />

                {props.teamDoc.data().namaAnggota1 &&
                    <>
                        <h4 className='mt-6 font-bold'>Berkas Anggota 1</h4>
                        <SetStatusBerkasCard
                            berkasType={BerkasType.anggota1}
                            berkasLink={props.teamDoc.data().identitasAnggota1}
                            berkasStatus={props.teamDoc.data().anggota1Verified}
                            teamId={props.teamDoc.id}
                            idCabang={props.teamDoc.data().idCabang}
                        />
                    </>
                }

                {props.teamDoc.data().namaAnggota2 &&
                    <>
                        <h4 className='mt-6 font-bold'>Berkas Anggota 2</h4>
                        <SetStatusBerkasCard
                            berkasType={BerkasType.anggota2}
                            berkasLink={props.teamDoc.data().identitasAnggota2}
                            berkasStatus={props.teamDoc.data().anggota2Verified}
                            teamId={props.teamDoc.id}
                            idCabang={props.teamDoc.data().idCabang}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default TeamDetailContainer