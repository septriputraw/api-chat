const routes = (handler) => [
  {
    method: 'GET',
    path: '/chat',
    handler: handler.getChatHandler,
  },
  {
    method: 'POST',
    path: '/chat/send',
    handler: handler.postChatHandler,
  },
  {
    method: 'GET',
    path: '/chat/{id}/list',
    handler: handler.getChatByIdHandler,
  },
  {
    method: 'GET',
    path: '/chat/{name}',
    handler: handler.getChatByReceiverHandler,
  },
];

module.exports = routes;
