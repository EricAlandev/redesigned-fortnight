import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Skip expensive checks that hang the builder
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // 2. Prevent the tracer from getting stuck in TypeORM's massive tree
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@sap/hana-client/**/*',
        'node_modules/oracle/**/*',
        'node_modules/mssql/**/*',
        'node_modules/mysql/**/*',
        'node_modules/mysql2/**/*',
        'node_modules/better-sqlite3/**/*',
        'node_modules/ioredis/**/*',
        'node_modules/redis/**/*',
        'node_modules/mongodb/**/*',
      ],
    },
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /(@sap\/hana-client|react-native-sqlite-storage|ioredis|redis|mongodb|oracle|mysql|mssql|mysql2|better-sqlite3)/,
        })
      );
    }
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    };

    return config;
  },
};

export default nextConfig;