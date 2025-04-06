/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable server-side rendering for Vercel
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
