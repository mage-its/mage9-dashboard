'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import merge from '@/utils/merge'
import Navbar from './navbar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/navigation'

interface MainProps extends React.HTMLAttributes<HTMLBodyElement> {
    children: React.ReactNode
}

const Main: React.FC<MainProps> = (props) => {
    const { children } = props
    const [showSidebar, setShowSidebar] = useState(true)
    const router = useRouter()
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    return (
        <main className="flex h-screen w-screen items-start justify-end overflow-x-hidden">
            <Sidebar showNavbar={showSidebar} toggle={setShowSidebar} toggled={showSidebar} />
            <div
                className={merge(
                    showSidebar ? 'w-4/5 pl-8 max-lg:w-full max-lg:pl-0' : 'w-full ',
                    'relative h-screen transition-all duration-100'
                )}
            >
                <Navbar toggle={setShowSidebar} toggled={showSidebar} />
                {children}
            </div>
        </main>
    )
}

export default Main
