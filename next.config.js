/**
 * @type { import("next").NextConfig }
 */
module.exports = {
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  httpAgentOptions: {
    keepAlive: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false
        }
      }
    }
    config.module = {
      ...config.module,
      exprContextCritical: false
    }
    return config
  }
}
