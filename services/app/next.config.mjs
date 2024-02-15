/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	distDir: 'build',
	// assetPrefix: "/app",
	publicRuntimeConfig: {
		basePath: "/app",
	},
	// basePath: "/test",
	// assetPrefix: "/tmp"
};

export default nextConfig;
