/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {protocol: 'https',
                hostname: 'tailus.io'
            }
        ]
    }

};

export default nextConfig;
