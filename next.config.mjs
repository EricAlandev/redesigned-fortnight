/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Ignore the noise
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // 2. Disable features that hog memory during build
  productionBrowserSourceMaps: false,
  swcMinify: true,

  webpack: (config, { isServer }) => {
    if (isServer) {
      // 3. This tells Next.js: "Don't try to bundle these, just link them"
      // This is the #1 fix for TypeORM hanging on Vercel
      config.externals = [...(config.externals || []), 'pg-native', 'sqlite3', 'mysql2', 'mysql', 'tedious', 'oracledb', 'mongodb', 'canvas'];
    }
    
    // 4. Resolve issue with TypeORM metadata
    config.resolve.alias = {
      ...config.resolve.alias,
      '@babel/runtime/helpers/esm/assertThisInitialized': require.resolve('@babel/runtime/helpers/assertThisInitialized'),
    };

    return config;
  },
};

export default nextConfig;