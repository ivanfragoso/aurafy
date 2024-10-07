"use client"

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import SparklesText from "./ui/sparkles-text"
import chroma from "chroma-js"

export default function Header() {
        const { data: session, status } = useSession()
        const router = useRouter()
        const colors = {first: chroma.random().hex(), second: chroma.random().hex()}

        return (
            <header className="container fixed left-0 right-0 mx-auto flex justify-between items-center bg-transparent p-4 z-30">
                <SparklesText className="text-2xl cursor-pointer" onClick={() => router.push("/")} text="aurafy" sparklesCount={5} colors={colors}></SparklesText>

                { session && (
                    <>
                        {session.user?.name}
                        <Button variant="secondary" onClick={() => signOut()}>Logout</Button>
                    </>
                )}
            </header>
        )

}