import { NextResponse } from 'next/server'
import { checkIfLoggedIn } from './firebase'
import { useRouter } from 'next/router'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const router = new useRouter()
    checkIfLoggedIn(() => router.push('/connect'), () => router.push('/'))

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/about/:path*',
}