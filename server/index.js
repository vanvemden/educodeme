/* eslint consistent-return:0 import/order:0 */
const express = require('express');
const r = require('rethinkdb');

const {
  onPublishAction,
  onPublishSession,
  onSubscribeSession,
  onSubscribeActions,
  onUnpublishSession,
  onUnsubscribeSession,
  onUnsubscribeActions,
  onSubscribeUsers,
  onPublishUser,
  onUnpublishUser,
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

/**
 * @description Connect RethinkDb to websocket events
 * @param {Object} Object with params.
 * @param {string} params.host - Host of db instance.
 * @param {number} params.port - Driver port.
 * @param {string} params.db - Db name.
 */
r.connect({
  host: 'localhost',
  port: 28015,
  db: 'educodeme',
}).then(connection => {
  io.on('connection', client => {
    /**
     * Handlers for publish and unpublish events.
     */

    /**
     * Register handler for publish session event.
     * @param {Object} Params object.
     * @param {string} params.sessionTopic - Session sessionTopic.
     * @param {string} params.username - Host username.
     * @param {function} Callback function.
     */
    client.on('publishSession', ({ sessionTopic, username }, callback) =>
      onPublishSession({
        callback,
        connection,
        sessionTopic,
        username,
      }),
    );

    /**
     * Register handler for unpublish session event.
     * @param {Object} Params object.
     * @param {string} params.id - Session id.
     * @param {string} params.token - Session token.
     * @param {function} Callback function.
     */
    client.on(
      'unpublishSession',
      ({ sessionId, userId, sessionToken }, callback) =>
        onUnpublishSession({
          callback,
          connection,
          sessionId,
          sessionToken,
          userId,
        }),
    );

    /**
     * Register handler for publish user event.
     * @param {Object} Params object.
     * @param {string} params.sessionId - Session id.
     * @param {string} params.username - Session token.
     * @param {function} Callback function.
     */
    client.on('publishUser', ({ sessionId, username }, callback) =>
      onPublishUser({
        callback,
        connection,
        sessionId,
        username,
      }),
    );

    /**
     * Register handler for unpublish user event.
     * @param {Object} Params object.
     * @param {string} params.id - User id.
     * @param {string} params.sessionId - Session id.
     * @param {string} params.token - User token.
     * @param {function} Callback function.
     */
    client.on('unpublishUser', ({ sessionId, userId, userToken }, callback) =>
      onUnpublishUser({
        callback,
        connection,
        sessionId,
        userId,
        userToken,
      }),
    );

    /**
     * Register handler for publish action event.
     * @param {Object} Params object.
     * @param {string} params.payload - Action payload.
     * @param {string} params.sessionId - Session id
     * @param {string} params.type - Action type.
     * @param {function} Callback function.
     */
    client.on('publishAction', ({ payload, sessionId, type }, callback) =>
      onPublishAction({
        callback,
        connection,
        payload,
        sessionId,
        type,
      }),
    );

    /**
     * Handlers for subscribe and unsubscribe events.
     */

    /**
     * Register handler for subscribe to session event.
     * @param {Object} Params object.
     * @param {string} params.id - Session id.
     */
    client.on('subscribeSession', ({ sessionId }) => {
      onSubscribeSession({
        client,
        connection,
        sessionId,
      });
    });

    /**
     * Register handler for unsubscribe session event.
     * @param {Object} Params object.
     * @param {string} params.id - Session id.
     * @param {string} params.userId - User id.
     * @param {string} params.userToken - User token.
     */
    client.on('unsubscribeSession', ({ sessionId, userId, userToken }) => {
      onUnsubscribeSession({
        client,
        connection,
        sessionId,
        userId,
        userToken,
      });
    });

    /**
     * Register handler for subscribe to users event.
     * @param {Object} Params object.
     * @param {string} params.id - Session id.
     * @param {timestamp} params.from - From date/time onward.
     */
    client.on('subscribeUsers', ({ sessionId, from }) => {
      console.log('in subscribeUsers ', sessionId);
      onSubscribeUsers({
        client,
        connection,
        sessionId,
        from,
      });
    });

    /**
     * Register handler for subscribe to actions event.
     * @param {Object} Params object.
     * @param {timestamp} params.from - From date/time onward.
     * @param {string} params.id - Session id.
     */
    client.on('subscribeActions', ({ from, sessionId }) => {
      onSubscribeActions({
        client,
        connection,
        from,
        sessionId,
      });
    });

    /**
     * Register handler for unsubscribe to actions event.
     * @param {Object} Params object.
     * @param {string} params.id - Session id.
     */
    client.on('unsubscribeActions', ({ sessionId }) => {
      onUnsubscribeActions({
        client,
        connection,
        sessionId,
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
