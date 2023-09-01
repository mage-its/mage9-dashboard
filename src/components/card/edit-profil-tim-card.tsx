'use client'
import Input from '@/components/form/input'
import { db } from '@/utils/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { DocumentData, QueryDocumentSnapshot, doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

interface EditProfilTimCardProps {
    teamDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
    idCabang: string
    onDone: (namaKetua: string, namaAnggota1: string, namaAnggota2: string) => void,
}

const EditProfilTimCard = (props: EditProfilTimCardProps) => {
    const [loading, setLoading] = useState(false);

    const TODOScheme = z.object({
        namaKetua: z.string().nonempty('Harap masukkan Nama Ketua!'),
        namaAnggota1: props.teamDoc.data().namaAnggota1 ? z.string().nonempty('Harap masukkan Nama Anggota 1!') : z.string(),
        namaAnggota2: props.teamDoc.data().namaAnggota2 ? z.string().nonempty('Harap masukkan Nama Anggota 2!') : z.string(),
    })

    type TODOType = z.infer<typeof TODOScheme>

    const InitialFormValue: TODOType = {
        namaKetua: props.teamDoc.data().namaKetua,
        namaAnggota1: props.teamDoc.data().namaAnggota1,
        namaAnggota2: props.teamDoc.data().namaAnggota2,
    }

    const methods = useForm<TODOType>({
        defaultValues: InitialFormValue,
        mode: 'onTouched',
        resolver: zodResolver(TODOScheme),
    })
    const { handleSubmit } = methods

    const onSubmit = async (data: TODOType) => {
        console.log(data)
        setLoading(true)

        const teamDocRef = doc(db, props.idCabang, props.teamDoc.id)
        await updateDoc(teamDocRef, {
            namaKetua: data.namaKetua,
            namaAnggota1: data.namaAnggota1,
            namaAnggota2: data.namaAnggota2,
        })

        // setTimeout(() => {
        setLoading(false)
        props.onDone(data.namaKetua, data.namaAnggota1, data.namaAnggota2)
        // }, 2000)
    }

    return (
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <h4 className='font-bold'>Kategori</h4>
                    <p className='text-gray-400'> {props.teamDoc.data().kategori} </p>

                    <h4 className='mt-6 font-bold'>Nama Tim</h4>
                    <p className='text-gray-400'> {props.teamDoc.data().namaTim} </p>

                    <h4 className='mt-6 font-bold'>Nama Ketua</h4>
                    <Input id="namaKetua" label="" />

                    {props.teamDoc.data().namaAnggota1 &&
                        <div>
                            <h4 className='mt-6 font-bold'>Nama Anggota1</h4>
                            <Input id="namaAnggota1" label="" />
                        </div>
                    }

                    {props.teamDoc.data().namaAnggota2 &&
                        <div>
                            <h4 className='mt-6 font-bold'>Nama Anggota2</h4>
                            <Input id="namaAnggota2" label="" />
                        </div>
                    }

                    {loading ? (
                        <button
                            className=" col-span-2 mx-auto mt-10 flex h-10 w-full items-center justify-center gap-5 rounded bg-custom-purple/80 text-white shadow-lg"
                            type="submit"
                            disabled
                        >
                            <svg className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500" viewBox="0 0 24 24">
                            </svg>
                            Updating...
                        </button>

                    ) : (
                        <button
                            className=" col-span-2 mx-auto mt-10 flex h-10 w-full items-center justify-center gap-5 rounded bg-custom-purple text-white hover:bg-custom-purple/80 hover:text-white hover:shadow-lg"
                            type="submit"
                        >
                            Ubah Profil
                        </button>
                    )}
                </form>
            </FormProvider>
        </>
    )
}

export default EditProfilTimCard