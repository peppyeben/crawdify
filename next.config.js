const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/v0/store",
                // source: "api/v0/:path*",
                destination: "http://localhost:4000/api/v0/store",
            },
        ];
    },
};

module.exports = nextConfig;
