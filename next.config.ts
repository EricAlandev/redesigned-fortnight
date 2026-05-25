/** @type {import('next').Config} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  turbopack: false
};

export default nextConfig;