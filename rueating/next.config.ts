// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// // export default nextConfig;

// // module.exports = {
// //   async rewrites() {
// //     return [
// //       {
// //         source: '/api/:path*',
// //         destination: 'http://127.0.0.1:5328/:path*', // Proxy to Backend
// //       },
// //     ]
// //   },
// // }

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : '/src/api/',
      },
    ]
  },
}

module.exports = nextConfig