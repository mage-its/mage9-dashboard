import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import React from 'react'
import { StatusBerkasComponent } from './status-berkas'
import { BerkasType } from '@/utils/enum'

interface DetailTimProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
    idCabang: string
}

const DetailTim = (props: DetailTimProps) => {
    return (
        <div className='grid gap-4 md:grid-cols-2 mt-6'>
            <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
                <h3>Profil Tim</h3>
                <hr className='my-2 border-white/50' />
                <h4 className='mt-6 font-bold'>Kategori</h4>
                <p> {props.teamDoc.data().kategori} </p>
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
                <h3>Berkas Pendaftaran</h3>
                <hr className='my-2 border-white/50' />
                <StatusBerkasComponent
                    nama='Berkas Pembayaran'
                    status={props.teamDoc.data().pembayaranVerified}
                    message={props.teamDoc.data().pembayaranDeniedMessage}
                    acceptFile='.jpg, .jpeg, .png, .pdf, .raw'
                    berkasType={BerkasType.pembayaran}
                    idCabang={props.idCabang}
                    teamId={props.teamDoc.id!}
                />
                <StatusBerkasComponent
                    nama='Berkas Ketua'
                    status={props.teamDoc.data().ketuaVerified}
                    message={props.teamDoc.data().ketuaDeniedMessage}
                    acceptFile='.zip, .rar'
                    berkasType={BerkasType.ketua}
                    idCabang={props.idCabang}
                    teamId={props.teamDoc.id!}
                />
                {props.teamDoc.data().namaAnggota1 &&
                    <StatusBerkasComponent
                        nama='Berkas Anggota 1'
                        status={props.teamDoc.data().anggota1Verified}
                        message={props.teamDoc.data().anggota1DeniedMessage}
                        acceptFile='.zip, .rar'
                        berkasType={BerkasType.anggota1}
                        idCabang={props.idCabang}
                        teamId={props.teamDoc.id!}
                    />
                }
                {props.teamDoc.data().namaAnggota2 &&
                    <StatusBerkasComponent
                        nama='Berkas Anggota 2'
                        status={props.teamDoc.data().anggota2Verified}
                        message={props.teamDoc.data().anggota2DeniedMessage}
                        acceptFile='.zip, .rar'
                        berkasType={BerkasType.anggota2}
                        idCabang={props.idCabang}
                        teamId={props.teamDoc.id!}
                    />
                }
            </div>
        </div>
    )
}

export default DetailTim