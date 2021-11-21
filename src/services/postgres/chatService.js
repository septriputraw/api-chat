/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToModelChat } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class chatService {
  constructor() {
    this._pool = new Pool();
  }

  async getChat(owner) {
    const query = {
      text: 'SELECT * FROM chats JOIN users ON users.id = chats.from WHERE chats.from = $1 OR chats.to = $1 ORDER BY created_at DESC',
      values: [owner],
    };

    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModelChat);
  }

  async getChatById(id) {
    const query = {
      text: 'SELECT * FROM chats JOIN users ON users.id = chats.to WHERE chats.id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      console.log('Data chat tidak ditemukan');
    }
    return result.rows.map(mapDBToModelChat)[0];
  }

  async getChatByReceiver(to) {
    const query = {
      text: 'SELECT * FROM chats JOIN users ON users.id = chats.to WHERE chats.to = $1 ORDER BY created_at DESC',
      values: [to],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      console.log('Data chat tidak ditemukan');
    }
    return result.rows.map(mapDBToModelChat)[0];
  }

  async getChatBySender(from) {
    const query = {
      text: 'SELECT * FROM chats WHERE from = $1 ORDER BY created_at DESC',
      values: [from],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      console.log('Data chat tidak ditemukan');
    }
    return result.rows.map(mapDBToModelChat)[0];
  }

  async sendChat({
    from, to, message,
  }) {
    const id = `chat-${nanoid(16)}`;
    const statusMessage = false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const query = {
      text: 'INSERT INTO chats VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, from, to, message, statusMessage, insertedAt, updatedAt],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      return 'Pesan gagal dikirim';
    }
    return result.rows[0].id;
  }

  async verifyChatOwner(id, user) {
    const query = {
      text: 'SELECT * FROM chats WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Chat tidak ditemukan');
    }

    const chat = result.rows[0];

    if (user === chat.to) {
      const updatedAt = new Date().toISOString();
      const query2 = {
        text: 'UPDATE chats SET status = true, updated_at = $1 WHERE id = $2',
        values: [updatedAt, id],
      };
      await this._pool.query(query2);
    } else if (user === chat.from) {
      console.log(chat);
    }
  }

  async verifyChatisRead(id, to) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE chats SET status = true, updated_at = $3 WHERE id = $1 AND to = $2',
      values: [id, to, updatedAt],
    };

    const result = await this._pool.query(query);

    const chat = result.rows[0];

    if (chat.to !== to) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = chatService;
