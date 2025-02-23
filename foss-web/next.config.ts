/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: only do this if you're confident in your code quality
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: only do this if you're confident in your type safety
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig