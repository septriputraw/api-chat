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

  async getChatHandler(request) {
    // add credential user logged in
    const { id: credentialId } = request.auth.credentials;
    const chat = await this._service.getChat(credentialId);
    return {
      status: 'success',
      data: {
        chat,
      },
    };
  }

  async getChatByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyChatOwner(id, credentialId);
    // await this._service.verifyChatisRead(id, credentialId);
    // await this._service.verifyChatOwner(id, credentialId);
    const chatId = await this._service.getChatById(id);
    return {
      status: 'success',
      data: {
        chat: chatId,
      },
    };
  }

  async getChatByReceiverHandler(request) {
    const { to } = request.params;
    const chat = await this._service.getChatByReceiver(to);
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
      to,
      message,
    } = request.payload;

    const { id: credentialId } = request.auth.credentials;

    const chatId = await this._service.sendChat({
      from: credentialId,
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
