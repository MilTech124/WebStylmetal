/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export',
	// trailingSlash: true,
	// reactStrictMode: true,
	images: {
		remotePatterns: [
		  {
			protocol: "http",
			hostname: "stylmetal.pl",
			port: "",
			pathname: "/wp-content/uploads/**",
		  },
		],
	},
}

module.exports = nextConfig
