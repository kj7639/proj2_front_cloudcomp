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
  // Removed output: 'standalone' and rewrites for Vercel deployment
}