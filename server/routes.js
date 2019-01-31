const getHandlers = require('./handlers/get-handlers');
const deleteHandlers = require('./handlers/delete-handlers');

module.exports = {
  getOne: { method: 'get', route: '/image/:name', handler: getHandlers.getOne },
  deleteAll: { method: 'delete', route: '/image', handler: deleteHandlers.deleteAll },
  deleteOne: { method: 'delete', route: '/image/:name', handler: deleteHandlers.deleteOne },
};
