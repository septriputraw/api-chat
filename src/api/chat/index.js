const ChatHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'chat',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const chatHandler = new ChatHandler(service, validator);
    server.route(routes(chatHandler));
  },
};
