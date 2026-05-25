/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config, context) => {
    const { isServer } = context; // This usually tricks the linter into being quiet
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "react-native-sqlite-storage": false,
        "@sap/hana-client": false,
        "hdb-pool": false,
        "antlr4ts": false,
      };
    }
    return config;
  },
};

export default nextConfig;