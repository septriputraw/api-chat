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
  {
    method: 'GET',
    path: '/chat/{id}',
    handler: handler.getChatByIdHandler,
    options: {
      auth: 'chatsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/chat/list/{to}',
    handler: handler.getChatByReceiverHandler,
  },
];

module.exports = routes;
