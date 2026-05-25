import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          // The magic is the asterisk at the end of the regex
          resourceRegExp: /(@sap\/hana-client.*|react-native-sqlite-storage.*|ioredis.*|redis.*|mongodb.*|oracle.*|mysql.*)/,
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