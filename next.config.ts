/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['typeorm'],
  compiler: {
    // This replaces the need for all those Babel plugins
    styledComponents: true, 
  },
  experimental: {
    // This helps with the TypeORM decorators
    swcPlugins: [] 
  }
};
export default nextConfig;