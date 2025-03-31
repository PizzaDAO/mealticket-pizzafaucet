/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["imagedelivery.net", "imgur.com", "i.imgur.com", "arweave.net"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mjcaifx88xrkz47y.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
