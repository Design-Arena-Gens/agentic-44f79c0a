/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  },
  webpack: (config) => {
    // Alias '@' to project root for cleaner imports
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = process.cwd();
    return config;
  }
};

export default nextConfig;
