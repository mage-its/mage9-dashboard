'use client'
import MyAnnouncement from '@/components/home/my-announcement'
import MyEvent from '@/components/home/my-event'
import LoadingComponent from '@/components/layout/loading'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from '@/utils/firebase'
import Link from 'next/link'
import DeadlineReminderCard from '@/components/card/deadline-reminder-card'

const HomeContainer = () => {
    const [loading, setLoading] = useState(true)
    const [announcements, setAnnouncements] = useState<any[]>([])
    const [events, setEvents] = useState<any[]>([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // ============= No Docs User Bug Fix =============
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    await setDoc(docRef, {
                        name: user.displayName,
                        admin: false,
                        competition: [],
                    });
                } else {
                    setIsAdmin(docSnap.data().admin)
                }
                // ================================================

                const querySnapshot = await getDocs(collection(db, 'announcement'));
                setAnnouncements(querySnapshot.docs.filter((doc) =>
                    doc.data().type == 'announcement' && (
                        doc.data().target == 'all' ||
                        docSnap.data()?.competition.includes(doc.data().target)
                    )
                ))
                setEvents(querySnapshot.docs.filter((doc) =>
                    doc.data().type == 'event' && (
                        doc.data().target == 'all' ||
                        docSnap.data()?.competition.includes(doc.data().target)
                    )
                ))

                setLoading(false)
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        loading ? (
            <LoadingComponent />
        ) : (
            <div className='pt-10'>
                {isAdmin &&
                    <Link
                        className="mx-auto px-4 py-4 w-3/4 flex min-h-10 items-center text-center justify-center rounded-xl bg-custom-purple text-white hover:bg-custom-purple/80 hover:text-white hover:shadow-lg"
                        href={'/admin'}
                    >
                        <h1>
                            DASHBOARD ADMIN
                        </h1>
                    </Link>
                }
                <section className="flex flex-col items-center justify-center gap-10 py-10">
                    <div className='w-3/4'>
                        <DeadlineReminderCard label='Penutupan Pendaftaran DevCom' date='2023-09-08' />
                    </div>
                    <div className=" min-h-[15rem] w-3/4 rounded-lg bg-custom-blue/50 overflow-hidden">
                        <div className="bg-custom-purple p-2.5">
                            <h1 className="text-center text-xl uppercase">Announcement</h1 >
                        </div >
                        <MyAnnouncement list={announcements} />
                    </div >
                    <div className=" min-h-[15rem] w-3/4 rounded-lg bg-custom-blue/50 overflow-hidden">
                        <div className="bg-custom-purple p-2.5">
                            <h1 className="text-center text-xl uppercase">Incoming Event</h1>
                        </div>
                        <MyEvent list={events} />
                    </div>
                </section >
            </div>
        )
    )
}

export default HomeContainer