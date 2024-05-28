/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/docs",
      destination: "/docs/index.html",
    },
  ],
}

export default nextConfig
