/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/',
      },
      {
        source:'/cadastro',
        destination:'/'
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
