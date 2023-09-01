import React from 'react'

interface ProfilTimCardProps {
    kategori: string,
    namaTim: string,
    namaKetua: string,
    namaAnggota1: string,
    namaAnggota2: string,
}

const ProfilTimCard = (props: ProfilTimCardProps) => {
    return (
        <>
            <h4 className='font-bold'>Kategori</h4>
            <p> {props.kategori} </p>
            <h4 className='mt-6 font-bold'>Nama Tim</h4>
            <p> {props.namaTim} </p>
            <h4 className='mt-6 font-bold'>Nama Ketua</h4>
            <p> {props.namaKetua} </p>
            {props.namaAnggota1 &&
                <div>
                    <h4 className='mt-6 font-bold'>Nama Anggota1</h4>
                    <p> {props.namaAnggota1} </p>
                </div>
            }

            {props.namaAnggota2 &&
                <div>
                    <h4 className='mt-6 font-bold'>Nama Anggota2</h4>
                    <p> {props.namaAnggota2} </p>
                </div>
            }
        </>
    )
}

export default ProfilTimCard