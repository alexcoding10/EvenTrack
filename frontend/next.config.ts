import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true, // Desactiva el linting durante la compilación
  },

};

export default nextConfig;
