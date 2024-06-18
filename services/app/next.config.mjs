/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	output: 'standalone',
	trailingSlash: true,
	productionBrowserSourceMaps: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
