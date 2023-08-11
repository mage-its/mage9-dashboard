'use client'
import React, { useState } from 'react'

const TeamVerification = () => {
    const [tab, setTab] = useState(0)

    let content
    switch (tab) {
        case 0:
            content = <div>Tab 1 content</div>
            break
        case 1:
            content = <div>Tab 2 content</div>
            break
        case 2:
            content = <div>Tab 3 content</div>
            break
        case 3:
            content = <div>Tab 4 content</div>
            break
        default:
            content = <div>No tab selected</div>
    }

    return (
        <div className='container px-5 py-3'>
            <div className='flex justify-evenly pb-3 gap-5'>
                <button onClick={() => setTab(0)} className={`${tab == 0 && 'bg-custom-purple'} px-2 py-1 rounded-full flex-1`}>
                    <h5>App Dev</h5>
                </button>
                <button onClick={() => setTab(1)} className={`${tab == 1 && 'bg-custom-purple'} px-2 py-1 rounded-full flex-1`}>
                    <h5>Game Dev</h5>
                </button>
                <button onClick={() => setTab(2)} className={`${tab == 2 && 'bg-custom-purple'} px-2 py-1 rounded-full flex-1`}>
                    <h5>IoT</h5>
                </button>
                <button onClick={() => setTab(3)} className={`${tab == 3 && 'bg-custom-purple'} px-2 py-1 rounded-full flex-1`}>
                    <h5>Robotics</h5>
                </button>
            </div>
            <hr />
            {content}
        </div>
    )
}

export default TeamVerification