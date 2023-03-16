import '@/styles/globals.css'

if (typeof window !== "undefined") {

    const devtools = window !== undefined && window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (window && devtools.renderers && Object.keys(devtools.renderers).length) {

        devtools.renderers = {};

    }
}

export default function App({ Component, pageProps }) {
    return <Component {...pageProps }
    />
}