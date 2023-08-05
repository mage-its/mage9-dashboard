/* eslint-disable no-useless-catch */
'use client'
import Input from '@/components/form/input'
import { DaftarLombaScheme, DaftarLombaType, InitialFormValue } from '@/constants'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function PendaftaranApp() {
    const methods = useForm<DaftarLombaType>({
        defaultValues: InitialFormValue,
        mode: 'onTouched',
        resolver: zodResolver(DaftarLombaScheme),
    })
    const { register, handleSubmit, reset } = methods

    const DaftarLomba = async (data: DaftarLombaType) => {
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value)
            })

            console.log('Form Data', formData)

            // await api.post('/olimpiade', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });
        } catch (error) {
            throw error
        }
    }

    const onSubmit = (data: DaftarLombaType) => {
        DaftarLomba(data)
        console.log('Form Submission Data', data)
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
                        <label htmlFor="kategori">Pilih Kategori:</label>
                        <select
                            id="kategori"
                            className="rounded border-gray-500 bg-gray-600"
                            {...register('kategori', { required: true })}
                        >
                            <option value="umum">Umum</option>
                            <option value="junior">Junior</option>
                        </select>
                    </div>
                    <div className="mx-auto flex w-full flex-col">
                        <label htmlFor="kategori">Tahu MAGE 9 Darimana:</label>
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
                    <Input id="namaTim" label="Nama Tim" />
                    <Input id="namaKetua" label="Nama Ketua" />
                    <Input id="waKetua" label="No HP Ketua" />
                    <Input id="lineKetua" label="ID Line Ketua" />
                    <Input id="namaAnggota1" label="Nama Anggota 1" />
                    <Input id="namaAnggota2" label="Nama Anggota 2" />
                    <Input id="asalKota" label="Asal Kota" />
                    <Input id="asalInstansi" label="Asal Instansi" />
                    <div className="col-span-2 w-full">
                        <Input id="alamatInstansi" label="Alamat Instansi" className="col-span-2 w-full" />
                    </div>
                </section>
                <section className="grid grid-cols-2 gap-x-5">
                    <Input
                        id="identitasKetua"
                        name="identitasKetua"
                        type="file"
                        label="Foto Identitas Ketua"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="identitasAnggota1"
                        name="identitasAnggota1"
                        type="file"
                        label="Foto Identitas Anggota 1"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="identitasAnggota2"
                        name="identitasAnggota2"
                        type="file"
                        label="Foto Identitas Anggota 2"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <Input
                        id="buktiPembayaran"
                        name="buktiPembayaran"
                        type="file"
                        label="Bukti Pembayaran"
                        className="rounded border border-dashed border-white bg-white/50 file:px-4 file:py-2"
                    />
                    <button
                        className=" col-span-2 mx-auto mt-10 flex h-10 w-full items-center justify-center gap-5 rounded bg-custom-purple text-white hover:bg-custom-purple/80 hover:text-white hover:shadow-lg"
                        type="submit"
                    >
                        Daftar
                    </button>
                </section>
            </form>
        </FormProvider>
    )
}
