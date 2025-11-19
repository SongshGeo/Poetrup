import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 抑制 Supabase Realtime 在 Edge Runtime 中的警告
  // 这个警告不影响功能，只是提示某些 Node.js API 在 Edge Runtime 中不可用
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // 将 Supabase Realtime 标记为外部包，避免在 Edge Runtime 中打包
  // Next.js 15 中已从 experimental 移动到顶层
  serverExternalPackages: ['@supabase/realtime-js'],
};

export default nextConfig;
