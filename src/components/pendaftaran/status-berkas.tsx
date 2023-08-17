'use client'
import { BerkasType, StatusBerkas } from '@/utils/enum'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '@/components/form/input'
import Image from 'next/image'
import UploadIcon from '~/assets/icon/upload.svg'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/utils/firebase'
import { toast } from 'react-hot-toast'
import { FirebaseError } from 'firebase/app'
import { doc, updateDoc } from 'firebase/firestore'
import idCabangToLabel from '@/utils/idCabangToLabel'

interface StatusBerkasComponentProps {
    nama: string
    status: StatusBerkas
    message: string
    acceptFile: string
    berkasType: BerkasType
    idCabang: string
    teamId: string
    teamName: string
}

const RevisiBerkasScheme = z.object({
    berkas: z.any().refine((value) => value.length > 0, { message: 'Harap masukkan berkas!' }),
})

type RevisiBerkasType = z.infer<typeof RevisiBerkasScheme>

export const StatusBerkasComponent = (props: StatusBerkasComponentProps) => {
    const [status, setStatus] = useState(StatusBerkas.verify)
    const [uploading, setUploading] = useState(false)

    const methods = useForm<RevisiBerkasType>({
        resolver: zodResolver(RevisiBerkasScheme),
    })

    const onSubmit = async (data: RevisiBerkasType) => {
        setUploading(true)
        try {
            setTimeout(() => { throw 'Haiya error' }, 2000)
            switch (props.berkasType) {
                case BerkasType.pembayaran:
                    {
                        const buktiPembayaranFolderRef = ref(storage, `${props.idCabang}/${props.teamId}/${idCabangToLabel(props.idCabang) + '_' + props.teamName}_Bukti Pembayaran.${data.berkas[0].name.split('.').pop()}`)
                        await uploadBytes(buktiPembayaranFolderRef, data.berkas[0]).then((snapshot) => {
                            return getDownloadURL(snapshot.ref);
                        }).then(async (url) => {
                            const teamDocRef = doc(db, props.idCabang, props.teamId)
                            await updateDoc(teamDocRef, {
                                pembayaranVerified: StatusBerkas.verify,
                                buktiPembayaran: url
                            })
                        }).catch((error) => { throw error })
                    }
                    break

                case BerkasType.ketua:
                    {
                        const identitasKetuaFolderRef = ref(storage, `${props.idCabang}/${props.teamId}/${idCabangToLabel(props.idCabang) + '_' + props.teamName}_Berkas Ketua.${data.berkas[0].name.split('.').pop()}`)
                        await uploadBytes(identitasKetuaFolderRef, data.berkas[0]).then((snapshot) => {
                            return getDownloadURL(snapshot.ref);
                        }).then(async (url) => {
                            const teamDocRef = doc(db, props.idCabang, props.teamId)
                            await updateDoc(teamDocRef, {
                                ketuaVerified: StatusBerkas.verify,
                                identitasKetua: url
                            })
                        }).catch((error) => { throw error })
                    }
                    break

                case BerkasType.anggota1:
                    {
                        const buktiAnggota1FolderRef = ref(storage, `${props.idCabang}/${props.teamId}/${idCabangToLabel(props.idCabang) + '_' + props.teamName}_Berkas Anggota 1.${data.berkas[0].name.split('.').pop()}`)
                        await uploadBytes(buktiAnggota1FolderRef, data.berkas[0]).then((snapshot) => {
                            return getDownloadURL(snapshot.ref);
                        }).then(async (url) => {
                            const teamDocRef = doc(db, props.idCabang, props.teamId)
                            await updateDoc(teamDocRef, {
                                anggota1Verified: StatusBerkas.verify,
                                identitasAnggota1: url
                            })
                        }).catch((error) => { throw error })
                    }
                    break

                case BerkasType.anggota2:
                    {
                        const buktiAnggota2FolderRef = ref(storage, `${props.idCabang}/${props.teamId}/${idCabangToLabel(props.idCabang) + '_' + props.teamName}_Berkas Anggota 2.${data.berkas[0].name.split('.').pop()}`)
                        await uploadBytes(buktiAnggota2FolderRef, data.berkas[0]).then((snapshot) => {
                            return getDownloadURL(snapshot.ref);
                        }).then(async (url) => {
                            const teamDocRef = doc(db, props.idCabang, props.teamId)
                            await updateDoc(teamDocRef, {
                                anggota2Verified: StatusBerkas.verify,
                                identitasAnggota2: url
                            })
                        }).catch((error) => { throw error })
                    }
                    break
            }
            setStatus(StatusBerkas.verify)
        } catch (error) {
            toast.error((error as FirebaseError).message)
        }
        setUploading(false)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [])


    return (
        <div className='mt-4 bg-gray-400/20 p-4 rounded-xl'>
            <div>
                <p className=' font-bold'>{props.nama}</p>
                {status == StatusBerkas.accepted &&
                    <p className=' text-emerald-400'>Diterima</p>
                }
                {status == StatusBerkas.denied &&
                    <p className=' text-red-400'>Ditolak</p>
                }
                {status == StatusBerkas.verify &&
                    <p className=' text-yellow-400'>Dalam Verifikasi</p>
                }
            </div>
            {status == StatusBerkas.upload &&
                <>
                    <p className='py-2 text-gray-300'>Ketentuan berkas dapat dilihat di Alur Pendaftaran dan Ketentuan Umum guidebook.</p>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className='grid gap-4 lg:grid-flow-col'>
                            <Input
                                id="berkas"
                                name="berkas"
                                type="file"
                                accept={props.acceptFile}
                                className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                            />
                            <button
                                className=" p-3 flex items-center justify-center rounded bg-gray-400 text-white hover:bg-gray-400/80 hover:text-white hover:shadow-lg"
                                type="submit"
                            >
                                {uploading ?
                                    <svg className="animate-spin rounded-full h-5 w-5 border-t-4 border-gray-700" viewBox="0 0 24 24">
                                    </svg>
                                    :
                                    <Image
                                        alt='Upload'
                                        priority={true}
                                        src={UploadIcon}
                                    />
                                }
                            </button>
                        </form>
                    </FormProvider>
                </>
            }
            {status == StatusBerkas.denied &&
                <>
                    <p className='py-2 text-gray-300'>{props.message || 'Terjadi error selama proses verifikasi'}</p>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className='grid gap-4 lg:grid-flow-col'>
                            <Input
                                id="berkas"
                                name="berkas"
                                type="file"
                                accept={props.acceptFile}
                                className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                            />
                            <button
                                className=" p-3 flex items-center justify-center rounded bg-gray-400 text-white hover:bg-gray-400/80 hover:text-white hover:shadow-lg"
                                type="submit"
                            >
                                {uploading ?
                                    <svg className="animate-spin rounded-full h-5 w-5 border-t-4 border-gray-700" viewBox="0 0 24 24">
                                    </svg>
                                    :
                                    <Image
                                        alt='Upload'
                                        priority={true}
                                        src={UploadIcon}
                                    />
                                }
                            </button>
                        </form>
                    </FormProvider>
                </>
            }
        </div>
    )
}


// const methods = useForm<DaftarLombaType>({
//     defaultValues: InitialFormValue,
//     mode: 'onTouched',
//     resolver: zodResolver(DaftarLombaScheme),
// })
// const { register, handleSubmit, reset } = methods
//     < FormProvider { ...methods }>