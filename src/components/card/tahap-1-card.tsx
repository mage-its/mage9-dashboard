import Image from 'next/image'
import UploadIcon from '~/assets/icon/upload.svg'
import Input from '@/components/form/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import idCabangToLabel from '@/utils/idCabangToLabel'
import { db, storage } from '@/utils/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { StatusBerkas } from '@/utils/enum'

const ProposalScheme = z.object({
    berkas: z.any().refine((value) => value.length > 0, { message: 'Harap masukkan berkas!' }),
})

type ProposalType = z.infer<typeof ProposalScheme>

interface Tahap1CardProps {
    idCabang: string
    teamId: string
    teamName: string
}

const Tahap1Card = (props: Tahap1CardProps) => {
    const [uploading, setUploading] = useState(false)
    const [uploadTime, setUploadTime] = useState<Date>()
    const [isBayar, setIsBayar] = useState(false)

    const methods = useForm<ProposalType>({
        resolver: zodResolver(ProposalScheme),
    })

    const { handleSubmit, reset } = methods

    const onSubmit = async (data: ProposalType) => {
        setUploading(true)
        try {
            const proposalRef = ref(storage, `${props.idCabang}/${props.teamId}/MAGE 9_Tahap 1_${idCabangToLabel(props.idCabang)}_${props.teamName}.${data.berkas[0].name.split('.').pop()}`)
            await uploadBytes(proposalRef, data.berkas[0]).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then(async (url) => {
                const teamDocRef = doc(db, props.idCabang, props.teamId)
                const now = new Date();
                await updateDoc(teamDocRef, {
                    berkasTahap1: url,
                    timeTahap1: now.getTime(),
                })
                setUploadTime(now)
                reset();
            })
        } catch (error) {
            toast.error((error as FirebaseError).message)
        }
        setUploading(false)
    }

    useEffect(() => {
        const docRef = doc(db, props.idCabang, props.teamId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                setUploadTime(new Date(docSnap.data().timeTahap1))
                setIsBayar(docSnap.data().timVerified)
            }
        });

    }, [])


    return (
        <div className='bg-gray-800/70 rounded-xl p-4 h-min mt-6'>
            <h3 className='text-center'>Tahap 1</h3>
            <hr className='my-2 border-white/50' />
            <div className='grid gap-4 md:grid-cols-2 mt-4'>
                <div className='bg-gray-400/20 p-4 rounded-xl'>
                    <p className='font-bold'>Template proposal</p>
                    <p className='mt-2 mb-5 text-gray-300'>
                        Template proposal dapat diunduh pada link berikut:
                    </p>
                    <a
                        className="px-4 py-2 text-center rounded-xl bg-custom-purple text-white hover:bg-custom-purple/80 hover:text-white hover:shadow-lg"
                        href={`/assets/template/${props.idCabang}.docx`}
                        target='_blank'
                        rel='noreferrer'
                        download={`Template Proposal ${idCabangToLabel(props.idCabang)}`}
                    >
                        Unduh di sini!
                    </a>
                </div>
                <div className='bg-gray-400/20 p-4 rounded-xl'>
                    <p className='font-bold'>Unggah Proposal</p>
                    <p className='mt-2 text-gray-300'>Proposal disimpan dalam bentuk pdf dengan format penamaan file:</p>
                    <p className='mb-2 text-gray-300'>MAGE 9_Tahap 1_{idCabangToLabel(props.idCabang)}_[Nama Tim].pdf</p>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 lg:grid-flow-col'>
                            <Input
                                id="berkas"
                                name="berkas"
                                type="file"
                                accept='.pdf'
                                className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                                disabled={!isBayar}
                            />
                            <button
                                className=" p-3 flex items-center justify-center rounded bg-gray-400 text-white hover:bg-gray-400/80 hover:text-white hover:shadow-lg"
                                type="submit"
                                disabled={!isBayar}
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
                    {!isBayar &&
                        <p className='mt-2 text-yellow-400'>Proposal hanya dapat diunggah setelah semua berkas terverifikasi!</p>
                    }
                    {!isNaN(uploadTime?.getTime() ?? NaN) && isBayar &&
                        <p className='mt-2 text-emerald-400'>Terunggah pada {uploadTime?.toString().substring(0, uploadTime?.toString().indexOf('GMT') - 1)}</p>
                    }
                </div>
            </div>
            <p className='text-gray-500 px-1 pt-4'>
                *Peserta diperbolehkan mengumpulkan atau mengganti proposal hingga batas waktu yang ditentukan, tetapi hanya submisi terakhir yang akan dinilai.
            </p>
        </div>
    )
}

export default Tahap1Card