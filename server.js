const dotenv = require('dotenv');

process.on('uncaughtException', (error) => {
  console.log(error.name, error.message);
  process.exit(1);
});

dotenv.config({
  path: './config.env',
});

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('server listening on port');
});

// * Error outside of the Express server

process.on('unhandledRejection', (error) => {
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});
