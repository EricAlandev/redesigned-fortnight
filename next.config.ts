const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  webpack: (config: any, { isServer }: any) => {
    if (isServer) {
      config.optimization.minimizer = config.optimization.minimizer.map((minimizer: any) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.minimizer.options.keep_classnames = true;
          minimizer.options.minimizer.options.keep_fnames = true;
        }
        return minimizer;
      });
    }
    return config;
  }
};

export default nextConfig;