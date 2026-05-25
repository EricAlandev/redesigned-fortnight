/** @type {import('next').Config} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;