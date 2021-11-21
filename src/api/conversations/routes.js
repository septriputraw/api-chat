const routes = (handler) => [
  {
    method: 'POST',
    path: '/conversations',
    handler: handler.postConversations,
  },
  {
    method: 'GET',
    path: '/conversations',
    handler: handler.getConversations,
  },
];

module.exports = routes;
