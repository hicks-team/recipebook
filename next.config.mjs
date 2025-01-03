// @ts-check

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/a/48ri51yc2x/**',
			},
		],
	},
};

export default bundleAnalyzer(config);
