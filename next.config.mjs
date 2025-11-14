/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable file watching for system files
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Disable page optimization during development
  reactStrictMode: false,
  // Experimental features to help with build
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Configure webpack to ignore system files
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '**/.next/**',
        '**/DumpStack.log.tmp',
        '**/hiberfil.sys',
        '**/pagefile.sys',
        '**/swapfile.sys'
      ],
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  }
}

export default nextConfig
