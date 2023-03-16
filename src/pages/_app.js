import { disableReactDevTools } from '@/disableDevTools'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
    process.env.NODE_ENV === "production" && disableReactDevTools()
    return <Component {...pageProps }
    />
}