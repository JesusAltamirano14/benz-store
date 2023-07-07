"use client"
import { SessionProvider } from "next-auth/react";


const ProviderAuth = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default ProviderAuth