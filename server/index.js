/* eslint consistent-return:0 import/order:0 */
const express = require('express');
const r = require('rethinkdb');

const {
  onPublishAction,
  onPublishSession,
  onSubscribeToSession,
  onSubscribeToSessionActions,
} = require('./helpers');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// Socket IO with CORS
const ioPort = 8000;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
io.listen(ioPort);
console.log('Socket-io listening on port ', ioPort);

// RethinkDB
r.connect({
  host: 'localhost',
  port: 28015,
  db: 'educodeme',
}).then(connection => {
  io.on('connection', client => {
    client.on('publishSession', ({ topic, username }, callback) =>
      onPublishSession({
        callback,
        connection,
        topic,
        username,
      }),
    );

    client.on('publishAction', ({ payload, sessionId, type }, callback) =>
      onPublishAction({
        callback,
        connection,
        payload,
        sessionId,
        type,
      }),
    );

    client.on('subscribeToSession', ({ id }) => {
      onSubscribeToSession({
        client,
        connection,
        id,
      });
    });

    client.on('subscribeToSessionActions', ({ id }) => {
      onSubscribeToSessionActions({
        client,
        connection,
        id,
      });
    });
  });
});

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
