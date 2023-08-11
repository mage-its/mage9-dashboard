'use client'
import { StatusBerkas } from '@/utils/enum'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '@/components/form/input'
import Image from 'next/image'
import UploadIcon from '~/assets/icon/upload.svg'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface StatusBerkasComponentProps {
    nama: string
    status: StatusBerkas
    message: string
}

const RevisiBerkasScheme = z.object({
    berkas: z.any().refine((value) => value.length > 0, { message: 'Harap masukkan berkas!' }),
})

type RevisiBerkasType = z.infer<typeof RevisiBerkasScheme>

export const StatusBerkasComponent = (props: StatusBerkasComponentProps) => {
    const methods = useForm<RevisiBerkasType>({
        resolver: zodResolver(RevisiBerkasScheme),
    })

    const onSubmit = (data: RevisiBerkasType) => {
        console.log(data)
    }

    return (
        <div className='mt-4 bg-gray-400/20 p-4 rounded-xl'>
            <div>
                <p className=' font-bold'>{props.nama}</p>
                {props.status == StatusBerkas.accepted &&
                    <p className=' text-emerald-400'>Diterima</p>
                }
                {props.status == StatusBerkas.denied &&
                    <p className=' text-red-400'>Ditolak</p>
                }
                {props.status == StatusBerkas.verify &&
                    <p className=' text-yellow-400'>Dalam Verifikasi</p>
                }
            </div>
            {props.status == StatusBerkas.denied &&
                <>
                    <p className='py-2 text-gray-300'>{props.message || 'Terjadi error selama proses verifikasi'}</p>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className='grid gap-4 lg:grid-flow-col'>
                            <Input
                                id="berkas"
                                name="berkas"
                                type="file"
                                accept=".zip, .rar"
                                className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                            />
                            <button
                                className=" p-3 flex items-center justify-center rounded bg-gray-400 text-white hover:bg-gray-400/80 hover:text-white hover:shadow-lg"
                                type="submit"
                            >
                                <Image
                                    alt='Upload'
                                    priority={true}
                                    src={UploadIcon}
                                />
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