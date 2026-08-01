const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const readLine = require('readline');

// Build the connection string and delay the initial connection briefly.
const connect = () => {
  setTimeout(() => {
    mongoose.connect(dbURI).catch((err) => {
      console.log('Mongoose initial connection error: ', err);
    });
  }, 1000);
};

// Monitor connection events.
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific listener.
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Configure graceful shutdown.
const gracefulShutdown = async (msg) => {
  try {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
  } catch (err) {
    console.log('Mongoose disconnection error: ', err);
  }
};

// Shutdown invoked by nodemon.
process.once('SIGUSR2', async () => {
  await gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// Shutdown invoked by application termination.
process.on('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

// Shutdown invoked by container or server termination.
process.on('SIGTERM', async () => {
  await gracefulShutdown('app shutdown');
  process.exit(0);
});

// Make the initial database connection.
connect();

// Import the Mongoose schema.
require('./travlr');

module.exports = mongoose;