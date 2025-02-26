import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://www.youtube.com https://player.vimeo.com",
          },
        ],
      },
    ];
  },
  // Habilitando imagens de domínios externos (thumbnails)
  images: {
    domains: ['img.youtube.com', 'i.vimeocdn.com'],
  },
};

export default nextConfig;
