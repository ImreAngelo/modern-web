/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	output: 'standalone',
	// rewrites: () => ({
	// 	// ...
	// 	afterFiles: [
	// 		{
	// 			source: `/_next/static*`,
	// 			destination: `/static*`,
	// 		},
	// 	]
	// })
};

export default nextConfig;
