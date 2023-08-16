/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      // {
      //   source: "/",
      //   destination: "/login",
      //   permanent: false,
      // },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.elgatoylacaja.com",
      },
    ],
  },
};

module.exports = nextConfig;
