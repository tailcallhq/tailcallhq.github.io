/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: '/docs/:path*',
      destination: "/docs/:path*/index.html",
    },
  ],
}

export default nextConfig
