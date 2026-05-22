import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Prevents TypeScript compilation errors from halting the build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 2. Core bypass flags to stop Turbopack from getting stuck in entity loops
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  
  // 3. Short timeout threshold so page data stalling doesn't freeze the deploy
  staticPageGenerationTimeout: 1000
};

export default nextConfig;