'use client'
import Input from '@/components/form/input'
import { COMPETITION_MODEL, DaftarLombaScheme, DaftarLombaType, InitialFormValue } from '@/constants'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth, db, storage } from '@/utils/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { DownloadGuidebookButton } from '../button/download-guidebook'
import { StatusBerkas } from '@/utils/enum'
import { FirebaseError } from 'firebase/app'

export default function FormDevCom(props: COMPETITION_MODEL) {

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
            // >>>>>>>>>>>>>>>> Add Compe Id to user
            const userRef = doc(db, 'users', auth.currentUser?.uid ?? '');
            const docSnap = await getDoc(userRef);
            let temp: any[] = docSnap.data()?.competition ?? []
            temp.push(props.idCabang)
            await updateDoc(userRef, {
                competition: temp
            });

            // >>>>>>>>>>>>>>>> Store image stuff
            // Identitas Ketua
            const identitasKetuaFolderRef = ref(storage, `${props.idCabang}/${auth.currentUser?.uid}/identitasKetua/${data.identitasKetua[0].name}`)
            await uploadBytes(identitasKetuaFolderRef, data.identitasKetua[0]).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then((url) => {
                data.identitasKetua = url
            }).catch((error) => { throw error })

            // Bukti Pembayaran
            const buktiPembayaranFolderRef = ref(storage, `${props.idCabang}/${auth.currentUser?.uid}/buktiPembayaran/${data.buktiPembayaran[0].name}`)
            await uploadBytes(buktiPembayaranFolderRef, data.buktiPembayaran[0]).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then((url) => {
                data.buktiPembayaran = url
            }).catch((error) => { throw error })

            // Anggota 1
            if (data.identitasAnggota1.length > 0 && data.namaAnggota1 != '') {
                const buktiPembayaranFolderRef = ref(storage, `${props.idCabang}/${auth.currentUser?.uid}/identitasAnggota1/${data.identitasAnggota1[0].name}`)
                await uploadBytes(buktiPembayaranFolderRef, data.identitasAnggota1[0]).then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                }).then((url) => {
                    data.identitasAnggota1 = url
                }).catch((error) => { throw error })
            } else {
                data.identitasAnggota1 = ''
                data.namaAnggota1 = ''
            }

            // Anggota 2
            if (data.identitasAnggota2.length > 0 && data.namaAnggota2 != '') {
                const buktiPembayaranFolderRef = ref(storage, `${props.idCabang}/${auth.currentUser?.uid}/identitasAnggota2/${data.identitasAnggota2[0].name}`)
                await uploadBytes(buktiPembayaranFolderRef, data.identitasAnggota2[0]).then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                }).then((url) => {
                    data.identitasAnggota2 = url
                }).catch((error) => { throw error })
            } else {
                data.identitasAnggota2 = ''
                data.namaAnggota2 = ''
            }

            // >>>>>>>>>>>>>>>> Store string stuff
            const newData = {
                ...data,
                ketuaVerified: StatusBerkas.verify,
                anggota1Verified: StatusBerkas.verify,
                anggota2Verified: StatusBerkas.verify,
                pembayaranVerified: StatusBerkas.verify,
            }

            const userDocRef = doc(db, props.idCabang, auth.currentUser?.uid ?? '')
            await setDoc(userDocRef, newData).catch((error) => { throw error });

            window.location.reload();
        } catch (error) {
            console.error(error)
            setLoading(false)
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
            <div className=' my-4 mx-auto w-3/4 flex flex-col mb-4 gap-5 md:flex-row items-center'>
                <div className='flex items-center justify-center gap-4'>
                    <Image
                        src={props.logo}
                        width={1}
                        height={1}
                        alt="Logo"
                        className="object-fit h-20 w-20 md:h-28 md:w-28"
                    />
                    <h1>{props.label}</h1>
                </div>
                <DownloadGuidebookButton link={props.guidebook} />
            </div>
            <form
                className="mx-auto w-3/4 space-y-10"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
            >
                <section className="grid h-full w-full gap-y-3 md:grid-cols-2 md:gap-x-5 md:gap-y-1">
                    <div className="mx-auto flex w-full flex-col  ">
                        <label htmlFor="kategori">Pilih Kategori: *</ label>
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
                        <label htmlFor="kategori">Tahu MAGE 9 Darimana: *</ label>
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
                    <Input id="namaTim" label="Nama Tim *" />
                    <Input id="namaKetua" label="Nama Ketua *" />
                    <Input id="waKetua" label="No HP Ketua *" />
                    <Input id="lineKetua" label="ID Line Ketua *" />
                    <Input id="namaAnggota1" label="Nama Anggota 1" />
                    <Input id="namaAnggota2" label="Nama Anggota 2" />
                    <Input id="asalKota" label="Asal Kota *" />
                    <Input id="asalInstansi" label="Asal Instansi *" />
                    <div className="md:col-span-2 w-full">
                        <Input id="alamatInstansi" label="Alamat Instansi" className="md:col-span-2 w-full" />
                    </div>
                </section>
                <section className="md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-1">
                    <h5 className='col-span-2 text-center font-bold mb-2'>
                        Ketentuan berkas dapat dilihat di Alur Pendaftaran dan Ketentuan Umum guidebook.
                    </h5>
                    <Input
                        id="identitasKetua"
                        name="identitasKetua"
                        type="file"
                        label="Berkas Ketua *"
                        accept=".zip, .rar"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="identitasAnggota1"
                        name="identitasAnggota1"
                        type="file"
                        label="Berkas Anggota 1"
                        accept=".zip, .rar"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="identitasAnggota2"
                        name="identitasAnggota2"
                        type="file"
                        label="Berkas Anggota 2"
                        accept=".zip, .rar"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="buktiPembayaran"
                        name="buktiPembayaran"
                        type="file"
                        label="Bukti Pembayaran *"
                        accept=".jpg, .jpeg, .png, .pdf, .raw"
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
