// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "standalone"
// };

// module.exports = nextConfig;


// UNCOMMENT THE FOLLOWING TO GET THE BACKEND RUNNING FOR LOCAL PORT REMOVE AFTER YOU ARE DONE TESTING
// /** @type {import('next').NextConfig} */
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://cpsy300-backend-alb-355541218.us-east-2.elb.amazonaws.com/api/:path*',
//       },
//     ]
//   },
// }


/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  // Rewrites to handle API requests properly
  async rewrites() {
    return {
      beforeFiles: [
        {
          // Keep auth requests local - don't rewrite them
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',
        }
      ],
      afterFiles: [
        // Route remaining API calls based on environment
        {
          source: '/api/:path((?!auth/).*)',
          destination: process.env.NEXT_PUBLIC_BACKEND_URL 
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`
            : '/api/:path*',
        }
      ]
    }
  },
}