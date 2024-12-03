/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    domains: ['res.cloudinary.com'],
  },
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
}

module.exports = nextConfig 