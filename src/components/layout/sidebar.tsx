'use client'
import { COMPETITIONS, DASHBOARD_LINK, WORKSHOP_LINK } from '@/constants'
import { auth, db } from '@/utils/firebase'
import merge from '@/utils/merge'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { BiHomeAlt2, BiLogOut, BiUserCheck } from 'react-icons/bi'
import { BsCalendar4Event, BsChevronDown } from 'react-icons/bs'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import Avatar from '~/assets/images/component/profile.png'
import Hamburger from 'hamburger-react'
import { doc, getDoc } from 'firebase/firestore'
interface SidebarProps {
    showNavbar: true | boolean
    toggle: React.Dispatch<React.SetStateAction<boolean>> | undefined
    toggled: boolean
}

export default function Sidebar({ showNavbar, toggle, toggled }: SidebarProps) {
    // STATE
    const [competitionOpen, setCompetitionOpen] = useState(true)
    const [workshopOpen, setWorkshopOpen] = useState(false)
    const [eventOpen, setEventOpen] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const router = useRouter()
    const [signOut] = useSignOut(auth)
    const [user] = useAuthState(auth)

    const handleLogout = () => {
        signOut()
        router.push('/login')
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    if (docSnap.data().admin) {
                        setIsAdmin(true)
                        setEventOpen(false)
                    }
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div
            className={merge(
                'relative h-screen lg:w-72',
                'bg-custom-purple-dark text-white',
                'fixed top-0 z-50',
                'flex flex-col items-center',
                'transition-all duration-150',
                showNavbar ? 'left-0' : '-left-72'
            )}
        >
            <div className="absolute left-0 top-0 lg:hidden">
                <Hamburger toggle={toggle} toggled={toggled} size={24} />
            </div>
            <section className="flex w-full flex-col items-center bg-custom-purple p-5">
                <div className="h-32 w-32 rounded-full shadow max-lg:h-20 max-lg:w-20">
                    <Image
                        src={user?.photoURL || Avatar}
                        width={150}
                        height={150}
                        alt="profile image"
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>
                <h1 className="text-xl max-lg:text-lg">{user?.displayName ?? user?.email}</h1>
                <p className="text-sm max-lg:text-xs">{user?.email}</p>
            </section>
            <section className="h-full w-full border-t-4 border-custom-blue pt-5 text-lg">
                <ul className="h-full w-full cursor-pointer">

                    {/* Home */}
                    <li className=" w-full hover:bg-white/25">
                        <Link href="/" className="inline-flex  h-full w-full items-center gap-2.5 p-2.5">
                            <BiHomeAlt2 />
                            Home
                        </Link>
                    </li>

                    {/* Event */}
                    <li className=" flex w-full flex-col gap-2.5">
                        <div
                            onClick={() => {
                                setEventOpen(!eventOpen)
                            }}
                            className="inline-flex items-center justify-between hover:bg-white/25"
                        >
                            <div className="inline-flex h-full w-full items-center gap-2.5 p-2.5">
                                <BsCalendar4Event />
                                Event
                            </div>
                            <BsChevronDown className={merge(eventOpen ? 'rotate-0' : '-rotate-90', 'mr-5 ')} />
                        </div>
                        {eventOpen && (
                            <ul className="flex flex-col gap-2.5 pl-10">
                                <li className="flex flex-col gap-2.5">
                                    <div
                                        className="inline-flex cursor-pointer items-center justify-between hover:bg-white/25"
                                        onClick={() => {
                                            setCompetitionOpen(!competitionOpen)
                                            setWorkshopOpen(false)
                                        }}
                                    >
                                        <span>Competition</span>
                                        <BsChevronDown
                                            className={merge(competitionOpen ? 'rotate-0' : '-rotate-90', 'mr-5 ')}
                                        />
                                    </div>
                                    {competitionOpen && (
                                        <ul className="space-y-2.5 pl-5">
                                            {COMPETITIONS.map((item, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Link
                                                            href={item.href}
                                                            className={merge(
                                                                'hover:border-b-white',
                                                                'border-b-2 border-b-transparent'
                                                            )}
                                                        >
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                </li>

                                <li className="flex flex-col gap-2.5">
                                    <div
                                        className="inline-flex cursor-pointer items-center justify-between hover:bg-white/25"
                                        onClick={() => {
                                            setWorkshopOpen(!workshopOpen)
                                            setCompetitionOpen(false)
                                        }}
                                    >
                                        <span>Workshop</span>
                                        <BsChevronDown
                                            className={merge(workshopOpen ? 'rotate-0' : '-rotate-90', 'mr-5 ')}
                                        />
                                    </div>
                                    {workshopOpen && (
                                        <ul className="space-y-2.5 pl-5">
                                            {WORKSHOP_LINK.map((item, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Link
                                                            href={item.href}
                                                            className={merge(
                                                                'hover:border-b-white',
                                                                'border-b-2 border-b-transparent'
                                                            )}
                                                            target='_blank'
                                                        >
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Dashbaord */}
                    {isAdmin &&
                        <li className=" flex w-full flex-col gap-2.5">
                            <div
                                onClick={() => {
                                    router.push('/admin')
                                }}
                                className="inline-flex items-center justify-between hover:bg-white/25"
                            >
                                <div className="inline-flex h-full w-full items-center gap-2.5 p-2.5">
                                    <BiUserCheck />
                                    Dashboard
                                </div>
                                {/* <BsChevronDown className='rotate-0 mr-5' /> */}
                            </div>
                            <ul className="flex flex-col gap-2.5 pl-12">
                                {DASHBOARD_LINK.map((item, i) => {
                                    return (
                                        <li key={i}>
                                            <Link
                                                href={item.href}
                                                className={merge(
                                                    'hover:border-b-white',
                                                    'border-b-2 border-b-transparent'
                                                )}
                                            >
                                                <span>{item.label}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    }
                </ul>
            </section>
            <section className="flex h-full w-full items-end">
                <button
                    className="flex w-full items-center justify-center gap-2.5 bg-custom-purple p-2.5 hover:bg-white/25"
                    onClick={handleLogout}
                >
                    <BiLogOut />
                    <span>Logout</span>
                </button>
            </section>
        </div>
    )
}
