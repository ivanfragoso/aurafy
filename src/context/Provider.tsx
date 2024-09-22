"use client"

import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

function Provider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default Provider;