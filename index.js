const config = require('./config');
const Server = require('./server/server');

if (!config.pictureDir) {
  console.error('No source picture directory configured');
  process.exit();
}

const server = new Server(config.port);

server.configure();
server.start();
