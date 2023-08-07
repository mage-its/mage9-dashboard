/* eslint-disable no-useless-catch */
'use client'
import Input from '@/components/form/input'
import { DaftarLombaScheme, DaftarLombaType, InitialFormValue } from '@/constants'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth, db, getDownloadURL, ref, storage, uploadBytes } from '@/utils/firebase'
import { doc, setDoc, } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

interface FormDevComProps {
    idCabang: string;
}

export default function FormDevCom(props: FormDevComProps) {

    const methods = useForm<DaftarLombaType>({
        defaultValues: InitialFormValue,
        mode: 'onTouched',
        resolver: zodResolver(DaftarLombaScheme),
    })
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = methods

    const DaftarLomba = async (data: DaftarLombaType) => {
        setLoading(true);
        try {
            // >>>>>>>>>>>>>>>> Store image stuff
            // Identitas Ketua
            const identitasKetuaFolderRef = ref(storage, `${props.idCabang}/${auth.currentUser?.uid}/identitasKetua/${data.identitasKetua[0].name}`)
            await uploadBytes(identitasKetuaFolderRef, data.identitasKetua[0]).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then((url) => {
                data.identitasKetua = url
            })

            // Bukti Pembayaran
            const buktiPembayaranFolderRef = ref(storage, `${props.idCabang}/${auth.currentUser?.uid}/buktiPembayaran/${data.buktiPembayaran[0].name}`)
            await uploadBytes(buktiPembayaranFolderRef, data.buktiPembayaran[0]).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then((url) => {
                data.buktiPembayaran = url
            })

            // Anggota 1
            if (data.identitasAnggota1[0]) {
                const buktiPembayaranFolderRef = ref(storage, `${props.idCabang}/${auth.currentUser?.uid}/buktiPembayaran/${data.identitasAnggota1[0].name}`)
                await uploadBytes(buktiPembayaranFolderRef, data.identitasAnggota1[0]).then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                }).then((url) => {
                    data.identitasAnggota1 = url
                })
            }

            // Anggota 2
            if (data.identitasAnggota2[0]) {
                const buktiPembayaranFolderRef = ref(storage, `${props.idCabang}/${auth.currentUser?.uid}/buktiPembayaran/${data.identitasAnggota2[0].name}`)
                await uploadBytes(buktiPembayaranFolderRef, data.identitasAnggota2[0]).then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                }).then((url) => {
                    data.identitasAnggota2 = url
                })
            }

            // >>>>>>>>>>>>>>>> Store string stuff
            const userDocRef = doc(db, props.idCabang, auth.currentUser?.uid ?? '')
            await setDoc(userDocRef, data);

            window.location.reload();
        } catch (error) {
            throw error
        }
    }

    const onSubmit = (data: DaftarLombaType) => {
        const daftarPromise = DaftarLomba(data)
        toast
            .promise(
                daftarPromise,
                {
                    loading: 'Loading...',
                    success: 'Pendaftaran Berhasil!',
                    error: (e) => e.response.data.message,
                },
                { duration: 3000 }
            )
            .then(() => {
                reset()
            })
    }
    return (
        <FormProvider {...methods}>
            <form
                className="mx-auto w-3/4 space-y-10 py-10"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
            >
                <section className="grid h-full w-full grid-cols-2 gap-x-5">
                    <div className="mx-auto flex w-full flex-col  ">
                        <label htmlFor="kategori">* Pilih Kategori:</label>
                        <select
                            id="kategori"
                            className="rounded border-gray-500 bg-gray-600"
                            {...register('kategori', { required: true })}
                        >
                            {props.idCabang == 'iot' ? (
                                <option value="umum">Umum</option>
                            ) : (
                                <>
                                    <option value="mahasiswa">Mahasiswa</option>
                                    <option value="siswa">Siswa</option>
                                </>
                            )}
                        </select>
                    </div>
                    <div className="mx-auto flex w-full flex-col">
                        <label htmlFor="kategori">* Tahu MAGE 9 Darimana:</label>
                        <select
                            id="kategori"
                            className="rounded border-gray-500 bg-gray-600"
                            {...register('asalInfo', { required: true })}
                        >
                            <option value="website">Website</option>
                            <option value="teman">Teman</option>
                            <option value="sosial_media">Sosial Media</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                    </div>
                    <Input id="namaTim" label="* Nama Tim" />
                    <Input id="namaKetua" label="* Nama Ketua" />
                    <Input id="waKetua" label="* No HP Ketua" />
                    <Input id="lineKetua" label="* ID Line Ketua" />
                    <Input id="namaAnggota1" label="Nama Anggota 1" />
                    <Input id="namaAnggota2" label="Nama Anggota 2" />
                    <Input id="asalKota" label="* Asal Kota" />
                    <Input id="asalInstansi" label="* Asal Instansi" />
                    <div className="col-span-2 w-full">
                        <Input id="alamatInstansi" label="Alamat Instansi" className="col-span-2 w-full" />
                    </div>
                </section>
                <section className="grid grid-cols-2 gap-x-5">
                    <Input
                        id="identitasKetua"
                        name="identitasKetua"
                        type="file"
                        label="* Berkas Ketua"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="identitasAnggota1"
                        name="identitasAnggota1"
                        type="file"
                        label="Berkas Anggota 1"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="identitasAnggota2"
                        name="identitasAnggota2"
                        type="file"
                        label="Berkas Anggota 2"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="buktiPembayaran"
                        name="buktiPembayaran"
                        type="file"
                        label="* Bukti Pembayaran"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    {loading ? (
                        <button
                            className=" col-span-2 mx-auto mt-10 flex h-10 w-full items-center justify-center gap-5 rounded bg-custom-purple/80 text-white shadow-lg"
                            type="submit"
                            disabled
                        >
                            <svg className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500" viewBox="0 0 24 24">
                            </svg>
                            Uploading...
                        </button>

                    ) : (
                        <button
                            className=" col-span-2 mx-auto mt-10 flex h-10 w-full items-center justify-center gap-5 rounded bg-custom-purple text-white hover:bg-custom-purple/80 hover:text-white hover:shadow-lg"
                            type="submit"
                        >
                            Daftar
                        </button>
                    )}
                </section>
            </form>
        </FormProvider>
    )
}
