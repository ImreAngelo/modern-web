import BundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	output: 'standalone',
	trailingSlash: true,
	productionBrowserSourceMaps: true,
    images: {
        loader: 'custom',
        loaderFile: './src/loaders/static-image-loader',
    },
};


/**
 * Statically analyze bundle size
 */
const withBundleAnalyzer = BundleAnalyzer({
	enabled: process.env.BUNDLE_ANALYZER === 'true',
})

export default withBundleAnalyzer(nextConfig);
