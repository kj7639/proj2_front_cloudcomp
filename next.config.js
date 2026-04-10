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
module.exports = {  output: 'standalone',  // Production config - both frontend and backend on same domain
  // Auth requests handled by local proxy in development, other API calls go through rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path((?!auth/).*)',
        destination: 'https://cpsy300.me/api/:path*',
        // destination: 'http://127.0.0.1:8000/api/:path*',

      },
    ]
  },
}