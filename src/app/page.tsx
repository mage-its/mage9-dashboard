import Main from '@/components/layout/main'
import React from 'react'
export default function Home() {
    return (
        <Main>
            <section className="flex h-full w-full flex-col items-center justify-center gap-10 pb-20">
                <div className="z-40 h-2/5 w-3/4 rounded-lg bg-custom-blue/50">
                    <div className="bg-custom-purple p-2.5">
                        <h1 className="text-center text-xl uppercase">Announcement</h1>
                    </div>
                </div>
                <div className="h-2/5 w-3/4 rounded-lg bg-custom-blue/50">
                    <div className="bg-custom-purple p-2.5">
                        <h1 className="text-center text-xl uppercase">Incoming Event</h1>
                    </div>
                </div>
            </section>
        </Main>
    )
}
