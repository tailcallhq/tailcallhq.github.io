/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  rewrites: async () => [
    {
      source: "/doc",
      destination: "/doc/index.html",
    },
  ],
}

export default nextConfig
