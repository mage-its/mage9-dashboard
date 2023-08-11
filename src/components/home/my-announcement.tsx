import React from 'react'

interface MyAnnouncementProps {
    list: any[],
}

const MyAnnouncement = (props: MyAnnouncementProps) => {
    return (
        <div className='divide-y-[2px] divide-cyan-500/20 px-4'>
            {props.list.map((value) => {
                return (
                    <div key={value.id}>
                        <div className='md:flex py-2'>
                            <h4 className='mr-auto'>{value.data().value}</h4>
                            <h4>{value.data().date}</h4>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MyAnnouncement