import { z } from 'zod'

export const COMPETITION_LINK = [
    {
        label: 'App Dev',
        href: '/event/competition/appdev',
    },
    {
        label: 'Game Dev',
        href: '/event/competition/gamedev',
    },
    {
        label: 'IoT',
        href: '/event/competition/iot',
    },
    {
        label: 'Robotics',
        href: '/event/competition/robotic',
    },
]

export const DaftarLombaScheme = z.object({
    kategori: z.string(),
    namaTim: z.string(),
    namaKetua: z.string(),
    waKetua: z.string(),
    lineKetua: z.string(),
    namaAnggota1: z.string().optional(),
    namaAnggota2: z.string().optional(),
    asalInstansi: z.string(),
    alamatInstansi: z.string(),
    asalInfo: z.string(),
    asalKota: z.string(),
    identitasKetua: z.any(),
    identitasAnggota1: z.any().optional(),
    identitasAnggota2: z.any().optional(),
    buktiPembayaran: z.any(),
})

export type DaftarLombaType = z.infer<typeof DaftarLombaScheme>

export const InitialFormValue: DaftarLombaType = {
    kategori: '',
    namaTim: '',
    namaKetua: '',
    waKetua: '',
    lineKetua: '',
    asalInstansi: '',
    alamatInstansi: '',
    asalInfo: '',
    asalKota: '',
    identitasKetua: '',
    namaAnggota1: '',
    namaAnggota2: '',
    identitasAnggota1: '',
    identitasAnggota2: '',
    buktiPembayaran: '',
}
