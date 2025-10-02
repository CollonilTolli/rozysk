import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Увеличиваем лимит размера тела запроса до 2GB
    serverComponentsExternalPackages: [],
  },
  // Настройки для больших файлов
  api: {
    bodyParser: {
      sizeLimit: '2gb',
    },
    responseLimit: false,
  },
  // Увеличиваем максимальный размер запроса
  serverRuntimeConfig: {
    maxRequestBodySize: 2 * 1024 * 1024 * 1024, // 2GB
  },
  webpack: (config: any) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
