import '@/styles/globals.css'

if (typeof window !== "undefined") {

    const devtools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (devtools.renderers && Object.keys(devtools.renderers).length) {
        devtools.renderers = {};
    }
}

export default function App({ Component, pageProps }) {
    return <Component {...pageProps }
    />
}