import { z } from 'zod'

export const DASHBOARD_LINK = [
    {
        label: 'Kelola Pengumuman',
        href: '/admin/announcement',
    },
    {
        label: 'Verifikasi Tim',
        href: '/admin/verifikasi',
    },
    {
        label: 'App Dev',
        href: '/admin',
    },
    {
        label: 'Game Dev',
        href: '/admin',
    },
    {
        label: 'IoT',
        href: '/admin',
    },
]

export const WORKSHOP_LINK = [
    {
        label: 'Multimedia',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSeDL41ZgkEwCu8YxKJp0kkrjchSop4Rt2CqFSQLNVA4Rk3U7A/viewform?usp=pp_url',
    },
    {
        label: 'Robotik',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLScH46d2WLTb-m2wFk9lTmHEhwB9XYCatkg8AFgoVuxkrDSD_g/viewform?usp=pp_url',
    },
    {
        label: 'IoT',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSdoRSLPct4OjxyT7U9dGF0Z4Y6I1e0Uun9juzlsbRn9ZoaQrA/viewform?usp=pp_url',
    },
]

export type COMPETITION_MODEL = {
    id: number
    label: string
    href: string
    idCabang: string
    guidebook: string
    logo: string
}

export const COMPETITIONS: COMPETITION_MODEL[] = [
    {
        id: 1,
        label: 'App Dev',
        href: '/event/competition/appdev',
        idCabang: 'appdev',
        guidebook: 'https://drive.google.com/file/d/1XdPs3pWk6OYeMpHMGCfyBcY-jYo6UZFJ/view?usp=sharing',
        logo: '/assets/images/logo/appdev.svg',
    },
    {
        id: 2,
        label: 'Game Dev',
        href: '/event/competition/gamedev',
        idCabang: 'gamedev',
        guidebook: 'https://drive.google.com/file/d/1vdFQvSl9NOgbvsQcSm0mm52slUIskQX5/view?usp=sharing',
        logo: '/assets/images/logo/gamedev.svg',
    },
    {
        id: 3,
        label: 'IoT',
        href: '/event/competition/iot',
        idCabang: 'iot',
        guidebook: 'https://drive.google.com/file/d/1s2UrN3KR-8COeZGNZBxyvxdnfWjOK1tc/view?usp=sharing',
        logo: '/assets/images/logo/iot.svg',
    },
    {
        id: 4,
        label: 'Robotics',
        href: '/event/competition/robotic',
        idCabang: 'robotics',
        guidebook: '#',
        logo: '/assets/images/logo/robotic.svg',
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
