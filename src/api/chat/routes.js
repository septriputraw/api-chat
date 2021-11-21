const routes = (handler) => [
  {
    method: 'GET',
    path: '/chat',
    handler: handler.getChatHandler,
    options: {
      auth: 'chatsapp_jwt',
    },
  },
  {
    method: 'POST',
    path: '/chat/send',
    handler: handler.postChatHandler,
    options: {
      auth: 'chatsapp_jwt',
    },
  },
  /* {
    method: 'GET',
    path: '/chat/{id}/list',
    handler: handler.getChatByIdHandler,
  }, */
  {
    method: 'GET',
    path: '/chat/{id}',
    handler: handler.getChatByReceiverHandler,
    options: {
      auth: 'chatsapp_jwt',
    },
  },
];

module.exports = routes;
