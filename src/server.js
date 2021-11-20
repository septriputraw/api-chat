require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');

const barang = require('./api/barang');
const BarangService = require('./services/inMemory/BarangService');
const BarangValidator = require('./validator/barang');

const item = require('./api/items');
const ItemsService = require('./services/postgres/ItemsService');
const ItemValidator = require('./validator/item');

const transaksi = require('./api/transaksi');
const TransaksiService = require('./services/inMemory/TransaksiService');

const transaction = require('./api/transactions');
const TransactionValidator = require('./validator/transaction');
const TransactionsService = require('./services/postgres/TransactionsService');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const chat = require('./api/chat');
const ChatService = require('./services/postgres/chatService');
const ChatValidator = require('./validator/chat');

const init = async () => {
  const barangService = new BarangService();
  const transaksiService = new TransaksiService();
  const itemsService = new ItemsService();
  const transactionsService = new TransactionsService();
  const usersService = new UsersService();
  const chatService = new ChatService();

  const server = Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: barang,
      options: {
        service: barangService,
        validator: BarangValidator,
      },
    },
    {
      plugin: transaksi,
      options: {
        service: transaksiService,
        serviceBarang: barangService,
      },
    },
    {
      plugin: item,
      options: {
        service: itemsService,
        validator: ItemValidator,
      },
    },
    {
      plugin: transaction,
      options: {
        service: transactionsService,
        serviceItem: itemsService,
        validator: TransactionValidator,
      },
    },
    {
      plugin: chat,
      options: {
        service: chatService,
        validator: ChatValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
