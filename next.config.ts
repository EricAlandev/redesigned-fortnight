/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.external = [...(config.externals || []), 'canvas', 'jsdom'];
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      "react-native-sqlite-storage": false,
      "@sap/hana-client": false,
      "hdb-pool": false,
      "antlr4ts": false,
      "mysql2": false,
      "oracledb": false,
      "pg-native": false,
    };
    return config;
  },
};
export default nextConfig;