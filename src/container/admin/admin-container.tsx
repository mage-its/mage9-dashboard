'use client'
import React, { useState } from 'react'
import TeamVerification from './verifikasi-tim-container'

const AdminPage = () => {
    const [tab, setTab] = useState(0)

    let content
    switch (tab) {
        case 0:
            content = <TeamVerification />
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
                <button onClick={() => setTab(0)} className={`${tab == 0 && 'bg-custom-purple'} px-4 py-2 rounded-full flex-1`}>
                    <h4>Verifikasi Tim</h4>
                </button>
                <button onClick={() => setTab(1)} className={`${tab == 1 && 'bg-custom-purple'} px-4 py-2 rounded-full flex-1`}>
                    <h4>Loke</h4>
                </button>
                <button onClick={() => setTab(2)} className={`${tab == 2 && 'bg-custom-purple'} px-4 py-2 rounded-full flex-1`}>
                    <h4>Loke</h4>
                </button>
                <button onClick={() => setTab(3)} className={`${tab == 3 && 'bg-custom-purple'} px-4 py-2 rounded-full flex-1`}>
                    <h4>Loke</h4>
                </button>
            </div>
            <hr />
            {content}
        </div>
    )
}

export default AdminPage