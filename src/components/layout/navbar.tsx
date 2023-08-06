import React, { useEffect, useState } from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import merge from '@/utils/merge'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/firebase'
import LogoMage from '~/assets/images/component/logo-mage.png'

interface NavbarProps {
    toggle: React.Dispatch<React.SetStateAction<boolean>> | undefined
    toggled: boolean
}

export default function Navbar({ toggle, toggled }: NavbarProps) {
    const pathname = usePathname()
    const route = pathname.split('/').filter((item) => item !== '' && item !== 'home')
    route.join('/')

    const [user] = useAuthState(auth)

    const [greeting, setGreeting] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const user_name = user?.displayName ?? ''
    useEffect(() => {

        // user_name undefined kalo blm nunggu
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const getCurrentGreeting = () => {
                    const currentHour = new Date().getHours()
                    if (currentHour >= 5 && currentHour < 12) {
                        return 'Selamat pagi! ' + user_name
                    } else if (currentHour >= 12 && currentHour < 18) {
                        return 'Selamat siang! ' + user_name
                    } else {
                        return 'Selamat malam! ' + user_name
                    }
                }
                setIsLoading(false)
                setGreeting(getCurrentGreeting())
            }
            else {
                setIsLoading(false)
            }
        });
        return () => unsubscribe();
        // user_name undefined kalo blm nunggu

        // const getCurrentGreeting = () => {
        //     const currentHour = new Date().getHours()
        //     if (currentHour >= 5 && currentHour < 12) {
        //         return 'Selamat pagi! ' + user_name
        //     } else if (currentHour >= 12 && currentHour < 18) {
        //         return 'Selamat siang! ' + user_name
        //     } else {
        //         return 'Selamat malam! ' + user_name
        //     }
        // }
        // setIsLoading(false)
        // setGreeting(getCurrentGreeting())

    }, [isLoading])

    return (
        <header
            className={merge(
                toggled ? 'px-10' : 'px-5',
                'inline-flex w-full items-center justify-between border-b-4 border-b-custom-blue py-2.5 max-lg:px-0'
            )}
        >
            <div className="inline-flex items-center gap-10">
                <div className={merge(toggled && 'max-lg:')}>
                    <Hamburger toggle={toggle} toggled={toggled} size={24} />
                </div>
                <Link href='http://localhost:3006'>
                    <Image
                        alt='Logo Mage9'
                        width={35}
                        height={35}
                        priority={true}
                        src={LogoMage}
                        className='h-auto w-full'
                    />
                </Link>
                {
                    <div className="inline-flex gap-2.5 max-lg:hidden">
                        {pathname !== '/' && (
                            <Link href="/" className="border-b-2 border-transparent capitalize hover:border-white">
                                Home
                            </Link>
                        )}
                        {route.map((item, i) => {
                            const clickedRoute = route.slice(0, i + 1).join('/')
                            return (
                                <div key={i}>
                                    {' / '}
                                    <Link
                                        href={`/${clickedRoute}`}
                                        className="border-b-2 border-transparent capitalize hover:border-white"
                                    >
                                        {item}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <div className="max-lg:pr-2.5">
                <p>{isLoading ? 'Loading...' : greeting}</p>
            </div>
        </header>
    )
}
