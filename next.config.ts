import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // 明确指定工作区根目录以避免部署时的警告
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
