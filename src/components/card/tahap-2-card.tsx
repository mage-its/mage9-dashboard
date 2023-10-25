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
import EditIcon from '~/assets/icon/edit.svg'
import Link from 'next/link'

interface Tahap2CardProps {
    idCabang: string
    teamId: string
    teamName: string
    tahap: number
    isStop: boolean
    linkTahap2: string
}

function addHttpsIfNeeded(url: string) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // URL doesn't start with either "http://" or "https://"
        return 'https://' + url
    } else {
        // URL already starts with "http://" or "https://"
        return url
    }
}

const Tahap2Card = (props: Tahap2CardProps) => {
    const [loading, setLoading] = useState(false)
    const [updateLink, setUpdateLink] = useState(true)
    const [linkTahap2, setLinkTahap2] = useState(props.linkTahap2)

    const TODOScheme = z.object({
        link: z
            .string()
            .nonempty('Harap masukkan link!')
            .refine(
                (value) => {
                    // Regular expression to check if the input is a valid URL
                    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/
                    return urlPattern.test(value)
                },
                {
                    message: 'Harap masukkan URL yang valid!',
                }
            ),
    })

    type TODOType = z.infer<typeof TODOScheme>

    const InitialFormValue: TODOType = {
        link: props.linkTahap2,
    }

    const methods = useForm<TODOType>({
        defaultValues: InitialFormValue,
        mode: 'onTouched',
        resolver: zodResolver(TODOScheme),
    })
    const { handleSubmit } = methods

    const onSubmit = async (data: TODOType) => {
        setLoading(true)
        const teamDocRef = doc(db, props.idCabang, props.teamId)
        const now = new Date()
        await updateDoc(teamDocRef, {
            berkasTahap2: addHttpsIfNeeded(data.link),
            timeTahap2: now.getTime(),
        })
        // setTimeout(() => {
        setLinkTahap2(addHttpsIfNeeded(data.link))
        setUpdateLink(false)
        setLoading(false)
        // }, 2000)
    }

    useEffect(() => {
        setUpdateLink(props.linkTahap2 == null)
    }, [])

    return (
        <div className="mt-6 h-min rounded-xl bg-gray-800/70 p-4">
            <h3 className="text-center">Tahap 2</h3>
            <hr className="my-2 border-white/50" />

            <h4 className="mb-2 mt-5 font-bold">Masukkan link pada kolom berikut</h4>
            <p>
                Link Google drive berisi file “RAR” yang terdiri dari hasil jadi Karya yang dibuat serta Video trailer
                karya.
            </p>

            {updateLink ? (
                <>
                    <FormProvider {...methods}>
                        <form className="mt-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <Input id="link" label="" />

                            {loading ? (
                                <button
                                    className=" col-span-2 mx-auto mt-6 flex h-10 w-full items-center justify-center gap-5 rounded bg-custom-purple/80 text-white shadow-lg"
                                    type="submit"
                                    disabled
                                >
                                    <svg
                                        className="h-5 w-5 animate-spin rounded-full border-t-4 border-blue-500"
                                        viewBox="0 0 24 24"
                                    ></svg>
                                    Updating...
                                </button>
                            ) : (
                                <button
                                    className=" col-span-2 mx-auto mt-6 flex h-10 w-full items-center justify-center gap-5 rounded bg-custom-purple text-white hover:bg-custom-purple/80 hover:text-white hover:shadow-lg"
                                    type="submit"
                                >
                                    Update link
                                </button>
                            )}
                        </form>
                    </FormProvider>
                </>
            ) : (
                <>
                    <div className="mt-4 flex rounded-xl bg-gray-400/20 p-4">
                        <div className=" w-[90%] flex-initial">
                            <Link href={linkTahap2} target="_blank" rel="noreferrer noopener">
                                <h4 className="truncate font-bold text-blue-400">{linkTahap2}</h4>
                            </Link>
                        </div>
                        <button
                            className="ml-auto flex-none"
                            onClick={() => {
                                setUpdateLink(true)
                            }}
                        >
                            <Image alt="Edit" priority={true} src={EditIcon} />
                        </button>
                    </div>
                </>
            )}
            <p className="px-1 pt-4 text-red-400">
                *Pastikan link drive yang dikumpulkan tidak di private dan dibuat siapapun yang memiliki link dapat
                melihat.
            </p>
            <p className="px-1 pt-4 text-gray-500">
                *Peserta diperbolehkan mengganti link hingga batas waktu yang ditentukan, tetapi hanya submisi terakhir
                yang akan dinilai.
            </p>
        </div>
    )
}

export default Tahap2Card
