"use client"

import { signIn, useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import Image from "next/image"

export default function Header() {
        const { data: session, status } = useSession()

        return (
            <header className="container fixed left-0 right-0 mx-auto flex justify-between items-center bg-transparent p-4 z-20">
                <span className="text-2xl font-bold">aurafy</span>

                { session && (
                    <>
                        {session.user?.name}
                        <Button variant="secondary" onClick={() => signOut()}>Logout</Button>
                    </>
                )}
            </header>
        )

}