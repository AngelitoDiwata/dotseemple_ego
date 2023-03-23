/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
// });

const JavaScriptObfuscatorPlugin = require('webpack-obfuscator')

const nextConfig = {
    images: {
        unoptimized: true,
    },
    webpack: (config, { buildId, dev }) => {
        if (!dev) {
            config.plugins.push(new JavaScriptObfuscatorPlugin({
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                debugProtection: false,
                debugProtectionInterval: 0,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                numbersToExpressions: true,
                renameGlobals: false,
                selfDefending: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayCallsTransformThreshold: 0.75,
                stringArrayEncoding: ['base64'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 2,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 4,
                stringArrayWrappersType: 'function',
                stringArrayThreshold: 0.75,
                transformObjectKeys: true,
                unicodeEscapeSequence: false
            }, ['bundles/**/**.js']))
        }

        return config
    },
    async headers() {
        return [{
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "false" },
                { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }]
    },
    reactStrictMode: true,
    productionBrowserSourceMaps: false
}
module.exports = nextConfig