/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // This prevents the builder from following database drivers into a rabbit hole
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Tell webpack to ignore these entirely during build
      'pg-native': false,
      'pg-query-stream': false,
    };
    return config;
  },
};

export default nextConfig;