const corsConfig = {
  origin: [
    'http://localhost:5173', // boilerplate for vite app
    'http://localhost:3000', // boilerplate for next app
    'https://example-prod-url.com', // prod environment
  ],
  allowedHeaders: ['Content-Type', 'Authorization'], // auth headers
  credentials: true, // allow credentials
};

export default corsConfig;
