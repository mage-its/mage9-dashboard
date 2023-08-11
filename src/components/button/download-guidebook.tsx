import React from 'react'

interface DownloadGuidebookButtonProps {
    link: string
}

export const DownloadGuidebookButton = (props: DownloadGuidebookButtonProps) => {
    return (
        <a
            className=" mx-auto px-4 py-4 w-full md:w-auto flex min-h-10 items-center text-center justify-center rounded-xl bg-custom-purple text-white hover:bg-custom-purple/80 hover:text-white hover:shadow-lg"
            href={props.link}
            target='_blank'
            rel='noreferrer noopener'
        >
            Unduh Guidebook di sini!
        </a>
    )
}
