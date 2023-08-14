import { COMPETITIONS } from "@/constants";

export default function idCabangToLabel(idCabang: string) {
    return COMPETITIONS.find((value) => value.idCabang == idCabang)?.label
}