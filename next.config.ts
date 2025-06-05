const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  env: {
    BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://modia.vercel.app"
        : "http://localhost:3000",
  },
});
