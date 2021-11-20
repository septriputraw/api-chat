/* eslint-disable no-underscore-dangle */
class ChatHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.getChatHandler = this.getChatHandler.bind(this);
    this.postChatHandler = this.postChatHandler.bind(this);
    this.getChatByIdHandler = this.getChatByIdHandler.bind(this);
    this.getChatByReceiverHandler = this.getChatByReceiverHandler.bind(this);
  }

  async getChatHandler() {
    const chat = await this._service.getChat();
    return {
      status: 'success',
      data: {
        chat,
      },
    };
  }

  async getChatByIdHandler(request) {
    const { id } = request.params;
    const chatId = await this._service.getChatById(id);
    return {
      status: 'success',
      data: {
        chat: chatId,
      },
    };
  }

  async getChatByReceiverHandler(request) {
    const { name } = request.params;
    const chat = await this._service.getChatByReceiver(name);
    return {
      status: 'success',
      data: {
        chat,
      },
    };
  }

  async postChatHandler(request, h) {
    this._validator.validateChatPayload(request.payload);

    const {
      from,
      to,
      message,
    } = request.payload;

    const chatId = await this._service.sendChat({
      from,
      to,
      message,
    });

    const response = h.response({
      status: 'succes',
      message: 'Chat berhasil dikirim',
      data: {
        chatId,
      },
    });

    response.code(201);
    return response;
  }
}

module.exports = ChatHandler;
