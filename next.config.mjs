/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // This prevents the build from choking on database drivers
      config.externalshasOwn = (id) => {
        return [
          'pg-native', 
          'sqlite3', 
          'mysql2', 
          'mysql', 
          'tedious', 
          'oracledb', 
          'mongodb'
        ].includes(id);
      };
    }
    return config;
  },
};

export default nextConfig;