/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['cdn.dota2.com']
	},
  async rewrites() {
    return [
      {
        source: '/api/auth/steam',
        destination: '/api/auth/[...nextauth]',
      },
      {
        source: '/api/auth/steam/return',
        destination: '/api/auth/[...nextauth]',
      },
    ];
  },
};

export default nextConfig;
