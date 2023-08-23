import { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export function useIsAdmin() {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userDoc = doc(db, 'users', userAuth.uid)
                const userData = await getDoc(userDoc)
                if (userData.exists()) {
                    setIsAdmin(userData.data().admin)
                    if (!userData.data().admin) {
                        router.push('/')
                    }
                }
            }
        })

        return () => unsubscribe()
    }, [])

    return isAdmin
}
