/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  
  // 1. Force the compiler to use a faster, lighter minifier
  swcMinify: true,
  
  // 2. This is critical for TypeORM - stop Webpack from trying to 
  // bundle the entire world of DB drivers
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'pg-native', 'sqlite3', 'mysql2', 'mysql', 'tedious', 'oracledb', 'mongodb', 'canvas'];
    }
    return config;
  },
};

export default nextConfig;