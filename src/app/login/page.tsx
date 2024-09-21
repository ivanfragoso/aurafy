"use client"

import { Button } from "@/components/ui/button"

export default function Login() {
    const handleLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID; // Asegúrate de exponer esto en tu frontend
        const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/callback'); // La URL de tu API que manejará el callback
        const scopes = encodeURIComponent('user-read-private user-read-email user-top-read'); // Define los scopes que necesitas
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;
    
        window.location.href = authUrl;
      };

    return (
        <main className="flex justify-center">
            <Button variant="outline" onClick={handleLogin}>Login</Button>
        </main>
    )
}