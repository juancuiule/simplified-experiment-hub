/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.elgatoylacaja.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.experiment-hub.com",
      },
    ],
  },
};

module.exports = nextConfig;
