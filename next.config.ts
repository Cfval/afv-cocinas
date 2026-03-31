import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    qualities: [75, 85],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter'],
  },
})

export default withNextIntl(withMDX(nextConfig))
