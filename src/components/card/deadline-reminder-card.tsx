import React from 'react'
import { useCountdown } from '@/hooks/useCountdown';

interface DeadlineReminderCardProps {
    label: string,
    date: string,
    dateString: string,
}

const DeadlineReminderCard = (props: DeadlineReminderCardProps) => {
    const [days, hours, minutes] = useCountdown(new Date(props.date));

    return (
        <div className='bg-gray-800/70 rounded-xl p-4 h-min flex gap-4 flex-col md:flex-row justify-center md:gap-10'>
            <h3 className='basis-1/3 my-auto text-center'>{props.label}</h3>
            <div className='basis-1/3 h-40 min-h-full flex flex-col'>
                <div className='flex-1 flex justify-evenly items-center md:gap-5'>
                    <div className='bg-gray-400/20 px-2 py-4 rounded-2xl text-center w-20 min-w-min'>
                        <h1>{days}</h1>
                        <p>Hari</p>
                    </div>
                    <h1>:</h1>
                    <div className='bg-gray-400/20 px-2 py-4 rounded-2xl text-center w-20 min-w-min'>
                        <h1>{hours}</h1>
                        <p>Jam</p>
                    </div>
                    <h1>:</h1>
                    <div className='bg-gray-400/20 px-2 py-4 rounded-2xl text-center w-20 min-w-min'>
                        <h1>{minutes}</h1>
                        <p>Menit</p>
                    </div>
                </div>
                <h4 className='text-center'>{props.dateString}</h4>
            </div>
        </div>
    )
}

export default DeadlineReminderCard