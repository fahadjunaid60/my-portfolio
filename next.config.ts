import type { NextConfig } from "next";
import path from "node:path";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    // lucide-react is already optimized by default; framer-motion isn't.
    // This shrinks per-route bundles and dev compile work substantially.
    optimizePackageImports: ["framer-motion"],
  },
};

export default withPayload(nextConfig);
