import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^( @sap\/hana-client|react-native-sqlite-storage|ioredis|redis|typeorm-aurora-data-api-driver|pg-native|mongodb|hdb-pool|mysql|mysql2|oracledb|pg-query-stream|sql.js|sqlite3|better-sqlite3)$/,
        })
      );
    }
    
    // Fallback for client-side just in case
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;