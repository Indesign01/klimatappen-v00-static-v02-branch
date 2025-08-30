//// next.config.js
///** @type {import('next').NextConfig} */
//const nextConfig = {
//  experimental: {
//    appDir: true,
//  },
//  images: {
//    domains: [],
//  },
//}
//module.exports = nextConfig




////Current
////Pausing this and using config below
//// next.config.js
///** @type {import('next').NextConfig} */
//const nextConfig = {
//  // Enable static export when building for GitHub Pages
//  ...(process.env.NEXT_PUBLIC_STATIC_BUILD === 'true' && {
//    output: 'export',
//    trailingSlash: true,
//    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
//    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
//    images: {
//      unoptimized: true,
//    },
//  }),
//
//  // Your existing config
//  experimental: {
//    appDir: true,
//  },
//
//  // Ensure external domains are allowed for images (if you use them)
//  images: {
//    ...(process.env.NEXT_PUBLIC_STATIC_BUILD !== 'true' && {
//      domains: ['jek-hb.github.io'],
//    }),
//    unoptimized: process.env.NEXT_PUBLIC_STATIC_BUILD === 'true',
//  },
//};
//
//module.exports = nextConfig;


////Current
////Pausing
//// next.config.js
///** @type {import('next').NextConfig} */
//const nextConfig = {
//  // Enable static export when building for GitHub Pages
//  ...(process.env.NEXT_PUBLIC_STATIC_BUILD === 'true' && {
//    output: 'export',
//    trailingSlash: true,
//    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
//    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
//    images: {
//      unoptimized: true,
//    },
//  }),
//
//  // Disable turbopack for static builds as it can cause issues
//  ...(process.env.NEXT_PUBLIC_STATIC_BUILD !== 'true' && {
//    experimental: {
//      turbo: true,
//    }
//  }),
//
//  // ESLint configuration
//  eslint: {
//    // Don't run ESLint during build in production
//    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
//  },
//
//  // TypeScript configuration
//  typescript: {
//    // Don't type-check during build in production to avoid blocking
//    ignoreBuildErrors: process.env.NODE_ENV === 'production',
//  },
//
//  // Image configuration
//  images: {
//    ...(process.env.NEXT_PUBLIC_STATIC_BUILD !== 'true' && {
//      domains: ['jek-hb.github.io'],
//    }),
//    unoptimized: process.env.NEXT_PUBLIC_STATIC_BUILD === 'true',
//  },
//};
//
//module.exports = nextConfig;




////Current
//// next.config.js
///** @type {import('next').NextConfig} */
//const nextConfig = {
//  // Enable static export when building for GitHub Pages
//  ...(process.env.NEXT_PUBLIC_STATIC_BUILD === 'true' && {
//    output: 'export',
//    trailingSlash: true,
//    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
//    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
//    images: {
//      unoptimized: true,
//    },
//  }),
//
//  // Disable turbopack for static builds as it can cause issues
//  ...(process.env.NEXT_PUBLIC_STATIC_BUILD !== 'true' && {
//    experimental: {
//      turbo: true,
//    }
//  }),
//
//  // ESLint configuration
//  eslint: {
//    // Don't run ESLint during build in production
//    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
//  },
//
//  // TypeScript configuration
//  typescript: {
//    // Don't type-check during build in production to avoid blocking
//    ignoreBuildErrors: process.env.NODE_ENV === 'production',
//  },
//
//  // Image configuration
//  images: {
//    ...(process.env.NEXT_PUBLIC_STATIC_BUILD !== 'true' && {
//      domains: ['jek-hb.github.io'],
//    }),
//    unoptimized: process.env.NEXT_PUBLIC_STATIC_BUILD === 'true',
//  },
//};
//
//module.exports = nextConfig;



//Current
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export when building for GitHub Pages
  ...(process.env.NEXT_PUBLIC_STATIC_BUILD === 'true' && {
    output: 'export',
    trailingSlash: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
    images: {
      unoptimized: true,
    },
  }),

  // Disable turbopack for static builds as it can cause issues
  ...(process.env.NEXT_PUBLIC_STATIC_BUILD !== 'true' && {
    experimental: {
      turbo: true,
    }
  }),

  // ESLint configuration
  eslint: {
    // Don't run ESLint during build in production
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },

  // TypeScript configuration
  typescript: {
    // Don't type-check during build in production to avoid blocking
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },

  // Image configuration
//  Pausing
//  domains: ['jek-hb.github.io', '/logo.png'],
  images: {
    ...(process.env.NEXT_PUBLIC_STATIC_BUILD !== 'true' && {
      domains: ['jek-hb.github.io'],
    }),
    unoptimized: process.env.NEXT_PUBLIC_STATIC_BUILD === 'true',
  },
};

module.exports = nextConfig;