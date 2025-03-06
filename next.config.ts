import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'media-hosting.imagekit.io',
      'example.com',
      'images.unsplash.com',
      'via.placeholder.com',
      // Add other domains you expect images from
    ],
    // Fallback for any unconfigured domains (safer approach)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
