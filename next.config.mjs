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
};

export default nextConfig;
