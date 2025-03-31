/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  distDir: isDev ? ".next-dev" : ".next", // Gunakan folder build yang berbeda untuk development dan production
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
      },
    ],
  },
};

module.exports = nextConfig;
