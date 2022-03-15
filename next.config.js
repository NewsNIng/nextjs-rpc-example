/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,

  poweredByHeader: false, // disable response headers x-powered-by

  reactStrictMode: true,

  // ignoreDuringBuilds: true, // disable build eslint
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
