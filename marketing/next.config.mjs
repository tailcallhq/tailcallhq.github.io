/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/doc",
      destination: "/doc/index.html",
    },
  ],
}

export default nextConfig
