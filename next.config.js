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
  // Simple rewrite: keep auth requests local, everything else routes naturally
  async rewrites() {
    return [
      {
        // Keep auth requests local - handled by Next.js API route
        source: '/api/:path((?!auth/).*)',
        destination: 'https://cpsy300.me/api/:path*',
      }
    ]
  },
}
