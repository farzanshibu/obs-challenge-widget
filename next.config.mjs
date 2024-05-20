// /** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: "dist", // Specify your desired output directory
};

export default {
  ...nextConfig,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
      },
    });
    return config;
  },
};
