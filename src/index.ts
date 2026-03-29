import http from 'http';
import app from './app';
import env from './config/env';

// Create HTTP server using the Express app
const server = http.createServer(app);

const exitHandler = (error: Error) => {
  // eslint-disable-next-line
  console.log(error, '[SERVER ERROR]');
  // Gracefully close the HTTP server if it exists
  if (server) server.close();
  // Exit the process with failure code
  process.exit(1);
};

// Handle unexpected runtime errors
process.on('uncaughtException', exitHandler);
process.on('unhandledRejection', exitHandler);

// Handle container / process termination signal
process.on('SIGTERM', () => {
  // eslint-disable-next-line
  console.log('SIGTERM received');
  // Gracefully shut down the server
  if (server) server.close();
});

// Start HTTP server
server.listen(env.app.port, () => {
  // eslint-disable-next-line
  console.log(`Server running on port ${env.app.port}`);
});
