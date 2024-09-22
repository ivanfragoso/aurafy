"use client"

import { Button } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

function useLoginUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data: session, status } = useSession()

  const handleLogin = async () => {
    const result = await signIn('spotify', { redirect: false })

    if (result?.ok) {
      setIsLoggedIn(true)
    } else {
      console.error("Login failed", result?.error)
      // Optionally, display an error message to the user here
    }
  };

  useEffect(() => {
    setIsLoggedIn(status === 'authenticated')
  }, [status])

  return { isLoggedIn, handleLogin }
}

export default function Home() {
  const { isLoggedIn, handleLogin } = useLoginUser();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex justify-center items-center h-full">
          {!isLoggedIn && <Button variant="outline" size="lg" onClick={handleLogin}>Get your Aura</Button>}
          {isLoggedIn && <Button variant="outline" size="lg" onClick={() => signOut({ redirect: false })}>SignOut</Button>}
        </div>
      </main>
    </div>
  )
}
