import { COMPETITIONS } from '@/constants'

export default function teamDataToTeamId(idCabang: string, kategori: string, count: number) {
    return (
        'DC' +
        idCabang.toUpperCase().charAt(0) +
        (idCabang == COMPETITIONS[3].idCabang ? kategori.charAt(2) : kategori.charAt(0)) +
        count.toString().padStart(3, '0')
    )
}
