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
    kategori: z.string().nonempty('Harap masukkan Kategori!'),
    namaTim: z.string().nonempty('Harap masukkan Nama Tim!'),
    namaKetua: z.string().nonempty('Harap masukkan Nama Ketua!'),
    waKetua: z.string().nonempty('Harap masukkan no WA Ketua!'),
    lineKetua: z.string().nonempty('Harap masukkan ID Line Ketua!'),
    namaAnggota1: z.string().optional(),
    namaAnggota2: z.string().optional(),
    asalInstansi: z.string().nonempty('Harap masukkan Asal Instansi!'),
    alamatInstansi: z.string(),
    asalInfo: z.string().nonempty('Harap masukkan Asal Info!'),
    asalKota: z.string().nonempty('Harap masukkan Asal Kota!'),
    identitasKetua: z.any().refine((value) => value.length > 0, { message: 'Harap masukkan identitas ketua!' }),
    identitasAnggota1: z.any().optional(),
    identitasAnggota2: z.any().optional(),
    buktiPembayaran: z.any().refine((value) => value.length > 0, { message: 'Harap masukkan bukti pembayaran!' }),
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
