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
  reactStrictMode: false, // Strict Mode 비활성화
  images : {
    domains: ['moving-app.site', 'd3h2ixicz4w2p.cloudfront.net'],
    remotePatterns : [
        {
            protocol : 'https',
            hostname : 'd3h2ixicz4w2p.cloudfront.net',
            port : '',
            pathname : '/**',
        }
    ]
  },

  // 보안 헤더 
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          }
        ]
      },
    ];
  }
};

export default nextConfig;
