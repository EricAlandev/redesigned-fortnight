/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // This forces Webpack to ignore the drivers that don't exist in Vercel
      config.externals.push({
        'react-native-sqlite-storage': 'react-native-sqlite-storage',
        'sqlite3': 'sqlite3',
        'mysql2': 'mysql2',
        'oracledb': 'oracledb',
        'pg-query-stream': 'pg-query-stream',
        '@sap/hana-client': '@sap/hana-client',
        'hdb-pool': 'hdb-pool',
        'antlr4ts': 'antlr4ts',
      });
    }
    return config;
  },
};

export default nextConfig;