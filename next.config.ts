import type { NextConfig } from 'next';

const basePath = '/snl';
const nextConfig: NextConfig = {
  basePath,
  env: {
    BASE_PATH: basePath,
  },
  devIndicators: {
    appIsrStatus: false,
  },
  output: 'export',
  distDir: 'docs',
};

export default nextConfig;
