/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	output: 'standalone',
	trailingSlash: true,
	productionBrowserSourceMaps: true,
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    images: {
        loader: 'custom',
        loaderFile: './src/loaders/static-image-loader',
    },
};

export default nextConfig;
