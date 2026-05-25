/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['typeorm'], // Ensures TypeORM isn't over-processed
  webpack: (config : any) => {
    config.optimization.mangleExports = false;
    config.optimization.minimize = false; // Only do this if mangleExports isn't enough
    return config;
  },
};

export default nextConfig;