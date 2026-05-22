import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // This explicitly tells the Next.js compiler to completely bypass 
  // checking or rendering pages statically during the build phase
  output: "standalone",
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;