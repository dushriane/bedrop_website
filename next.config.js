/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'standalone',
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    // Fix Windows path casing issues
    if (!isServer) {
      config.resolve.symlinks = false;
    }
    
    return config;
  },
};

module.exports = withMDX(nextConfig);
