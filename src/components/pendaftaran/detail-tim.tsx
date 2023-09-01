'use client'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import React, { useState } from 'react'
import { StatusBerkasComponent } from './status-berkas'
import { BerkasType } from '@/utils/enum'
import EditIcon from '~/assets/icon/edit.svg'
import Image from 'next/image'
import ProfilTimCard from '../card/profil-tim-card'
import EditProfilTimCard from '../card/edit-profil-tim-card'

interface DetailTimProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
    idCabang: string
}

const DetailTim = (props: DetailTimProps) => {
    const [isEditProil, setIsEditProil] = useState(false)
    const [ketua, setKetua] = useState(props.teamDoc.data().namaKetua)
    const [ang1, setAng1] = useState(props.teamDoc.data().namaAnggota1)
    const [ang2, setAng2] = useState(props.teamDoc.data().namaAnggota2)

    return (
        <div className='grid gap-4 md:grid-cols-2 mt-6'>
            <div className='bg-gray-800/70 rounded-xl p-4 h-min'>
                <div className='flex items-center'>
                    <h3>Profil Tim</h3>
                    <div className='ml-auto'>
                        {!props.teamDoc.data().timVerified &&
                            <button className='flex items-center gap-2' onClick={() => setIsEditProil(!isEditProil)}>
                                <p className={isEditProil ? 'text-yellow-400' : 'text-gray-500'}>Edit Profil Tim</p>
                                <Image
                                    alt='Edit'
                                    priority={true}
                                    src={EditIcon}
                                />
                            </button>
                        }
                    </div>
                </div>
                <hr className='my-2 border-white/50 mb-6' />

                {isEditProil ? (
                    <EditProfilTimCard teamDoc={props.teamDoc} idCabang={props.idCabang} onDone={(ketua: string, ang1: string, ang2: string) => {
                        setKetua(ketua)
                        setAng1(ang1)
                        setAng2(ang2)
                        setIsEditProil(false)
                    }} />
                ) : (
                    <ProfilTimCard
                        kategori={props.teamDoc.data().kategori}
                        namaTim={props.teamDoc.data().namaTim}
                        namaKetua={ketua}
                        namaAnggota1={ang1}
                        namaAnggota2={ang2}
                    />
                )}
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
                    teamName={props.teamDoc.data().namaTim}
                />
                <StatusBerkasComponent
                    nama='Berkas Ketua'
                    status={props.teamDoc.data().ketuaVerified}
                    message={props.teamDoc.data().ketuaDeniedMessage}
                    acceptFile='.zip, .rar'
                    berkasType={BerkasType.ketua}
                    idCabang={props.idCabang}
                    teamId={props.teamDoc.id!}
                    teamName={props.teamDoc.data().namaTim}
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
                        teamName={props.teamDoc.data().namaTim}
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
                        teamName={props.teamDoc.data().namaTim}
                    />
                }
            </div>
        </div>
    )
}

export default DetailTim