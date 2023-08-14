import SetStatusBerkasCard from '@/components/card/set-status-berkas-card'
import { BerkasType } from '@/utils/enum'
import idCabangToLabel from '@/utils/idCabangToLabel'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import React from 'react'

interface TeamDetailContainerProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
}

const TeamDetailAdminContainer = (props: TeamDetailContainerProps) => {
    return (
        <div className='grid gap-4 md:grid-cols-2'>
            <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
                <h4>Profil Tim</h4>
                <hr className='my-2 border-white/50' />

                <div className='mt-4 grid grid-cols-2 gap-4'>
                    <div>
                        <h4 className='font-bold'>Cabang Perlombaan</h4>
                        <p> {idCabangToLabel(props.teamDoc.data().idCabang)} </p>
                    </div>

                    <div>
                        <h4 className='font-bold'>Kategori</h4>
                        <p> {props.teamDoc.data().kategori} </p>
                    </div>

                    <div>
                        <h4 className='font-bold'>Nama Tim</h4>
                        <p> {props.teamDoc.data().namaTim} </p>
                    </div>

                    <div>
                        <h4 className='font-bold'>Nama Ketua</h4>
                        <p> {props.teamDoc.data().namaKetua} </p>
                    </div>

                    {props.teamDoc.data().namaAnggota1 &&
                        <div>
                            <h4 className='font-bold'>Nama Anggota1</h4>
                            <p> {props.teamDoc.data().namaAnggota1} </p>
                        </div>
                    }

                    {props.teamDoc.data().namaAnggota2 &&
                        <div>
                            <h4 className='font-bold'>Nama Anggota2</h4>
                            <p> {props.teamDoc.data().namaAnggota2} </p>
                        </div>
                    }

                    <div>
                        <h4 className='font-bold'>Asal Kota</h4>
                        <p> {props.teamDoc.data().asalKota} </p>
                    </div>

                    <div>
                        <h4 className='font-bold'>Asal Instansi</h4>
                        <p> {props.teamDoc.data().asalInstansi} </p>
                    </div>
                </div>

                <h4 className='mt-8'>Kontak Ketua</h4>
                <hr className='my-2 border-white/50' />

                <div className='mt-4 grid grid-cols-2 gap-4'>
                    <div>
                        <h4 className='font-bold'>Email</h4>
                        <p> {props.teamDoc.data().email} </p>
                    </div>

                    <div>
                        <h4 className='font-bold'>Line</h4>
                        <p> {props.teamDoc.data().lineKetua} </p>
                    </div>

                    <div>
                        <h4 className='font-bold'>Whatsapp</h4>
                        <p>
                            <Link href={`https://wa.me/${props.teamDoc.data().waKetua.replace(/^0/, '62')}`} target='_blank' rel='noreferrer noopener'>
                                {props.teamDoc.data().waKetua}
                            </Link>
                        </p>
                    </div>
                </div>
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

export default TeamDetailAdminContainer