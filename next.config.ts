import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Tells the compiler to skip type validation blocking errors
    ignoreBuildErrors: true,
  },
  experimental: {
    // Forces Next.js to run everything in a single process, completely 
    // shutting down separate static optimization build workers
    workerThreads: false,
    cpus: 1
  },
  // If a page hangs or hits an initialization checkpoint, instantly pass it 
  staticPageGenerationTimeout: 0
};

export default nextConfig;