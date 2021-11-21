/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToModelChat } = require('../../utils');

class chatService {
  constructor() {
    this._pool = new Pool();
  }

  async getChat() {
    const result = this._pool.query(
      'SELECT * FROM chats ORDER BY created_at DESC',
    );
    return (await result).rows;
  }

  async getChatById(id) {
    const query = {
      text: 'SELECT * FROM chats WHERE id = $1',
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
      text: 'SELECT from, message FROM chats WHERE to = $1',
      values: [to],
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
}

module.exports = chatService;
