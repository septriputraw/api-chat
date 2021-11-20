/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('chats', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    from: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    to: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    message: {
      type: 'TEXT',
      notNull: true,
    },
    status: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('chats');
};
