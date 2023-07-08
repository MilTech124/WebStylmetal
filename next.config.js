/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export',
	// reactStrictMode: true,
	images: {
		remotePatterns: [
		  {
			protocol: "https",
			hostname: "stylmetal.pl",
			port: "",
			pathname: "/wp-content/uploads/**",
		  },
		],
	},
}

module.exports = nextConfig
