/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      domains: ['res.cloudinary.com','storage.googleapis.com','media-cdn.tripadvisor.com','openweathermap.org',
    'lh3.googleusercontent.com','cdn-icons-png.flaticon.com'],
    },
    swcMinify : false,

    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  };