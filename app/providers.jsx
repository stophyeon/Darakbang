'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient = undefined

function getQueryClient() {
    if (typeof window === 'undefined') {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

export default function Providers({ children }) {
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}