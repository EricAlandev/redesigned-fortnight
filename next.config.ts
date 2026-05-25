const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // This prevents the "Cannot access before initialization" crash during fetch
  dynamicIO: false, 
};