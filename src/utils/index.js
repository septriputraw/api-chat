/* eslint-disable camelcase */
const mapDBToModelChat = ({
  id,
  from,
  to,
  message,
  status,
  created_at,
  updated_at,
}) => ({
  id,
  from,
  to,
  message,
  isRead: status,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModelChat };
