import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/uploads/**',
      },
        {
            protocol: 'https',
            hostname: 'nature-back.onrender.com',
            port: '',
            pathname: '/uploads/**',
        },
    ],
  }
};

export default nextConfig;
