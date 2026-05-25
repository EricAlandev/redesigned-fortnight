/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['typeorm'],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;