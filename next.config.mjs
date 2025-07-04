/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:8000/api/auth/:path*", // 백엔드 주소로 변경
      },
    ];
  },
  // reactStrictMode: false, // Strict Mode 비활성화
  images : {
    remotePatterns : [
        {
            protocol : 'https',
            hostname : 'd3h2ixicz4w2p.cloudfront.net',
            port : '',
            pathname : '/**',
        }
    ]
  },
  env:{
    JWT_SECRET: process.env.JWT_SECRET,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  }
};

export default nextConfig;
