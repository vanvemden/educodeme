const r = require('rethinkdb');
const { v4: uuidv4 } = require('uuid');

/**
 * Helper functions to publish and unpublish websocket stream.
 */

/**
 * @description Helper to start session websocket stream.
 * @param {Object} Object with params.
 * @param {function} params.callback - Callback function.
 * @param {Object} params.connection - Database connection.
 * @param {string} params.topic - Session topic.
 * @param {string} params.username - Session host username.
 * @returns {Object} response - The generated session fields.
 * @returns {string} response.id - Session Id.
 * @returns {timestamp} response.timestamp - Session created timestamp.
 * @returns {string} response.token - Session token.
 */
function onPublishSession({ callback, connection, topic, username }) {
  const token = uuidv4();
  const timestamp = new Date();
  return r
    .table('sessions')
    .insert({
      isLivestream: true,
      timestamp,
      token,
      topic,
      username,
    })
    .run(connection)
    .then(result => {
      const id = result.generated_keys[0];
      return callback({ id, timestamp, token });
    });
}

/**
 * @description Helper to end session websocket stream.
 * @param {Object} Object with params.
 * @param {function} params.callback - Callback function.
 * @param {Object} params.connection - Database connection.
 * @param {string} params.id - Session id.
 * @param {string} params.token - Session token.
 * @returns {string} response.token - Session token.
 */
function onUnpublishSession({ callback, connection, id, token }) {
  return r
    .table('sessions')
    .filter([{ id }, { token }])
    .update({ isLivestream: false })
    .run(connection)
    .then(result => callback({ result }));
}

/**
 * @description Helper to insert session user into db.
 * @param {Object} Object with params.
 * @param {function} params.callback - Callback function.
 * @param {Object} params.connection - Database connection.
 * @param {string} params.sessionId - Session id.
 * @param {string} params.username - Username.
 * @returns {Object} response - The generated user fields.
 * @returns {string} response.id - User Id.
 * @returns {string} response.token - User token.
 */
function onPublishUser({ callback, connection, sessionId, username }) {
  console.log('onPublishUser sessionId, username', sessionId, username);
  const token = uuidv4();
  r.table('users')
    .insert({
      sessionId,
      timestamp: new Date(),
      token,
      username,
    })
    .run(connection)
    .then(result => {
      const id = result.generated_keys[0];
      return callback({ id, token });
    });
}

/**
 * @description Helper to delete session user from db.
 * @param {Object} Object with params.
 * @param {function} params.callback - Callback function.
 * @param {Object} params.connection - Database connection.
 * @param {id} params.id - User id.
 * @param {string} params.sessionId - Session id.
 * @param {string} params.token - User token.
 * @returns {Object} response - The db result.
 */
function onUnpublishUser({ callback, connection, id, sessionId, token }) {
  r.table('users')
    .filter({ id, sessionId, token })
    .delete()
    .run(connection)
    .then(result => callback(result));
}

/**
 * @description Helper to insert session action into db.
 * @param {Object} Object with params.
 * @param {function} params.callback - Callback function.
 * @param {Object} params.connection - Database connection.
 * @param {string} params.payload - Action payload.
 * @param {string} params.sessionId - Session id.
 * @param {string} params.type - Action type.
 * @returns {Object} response - The response.
 */
function onPublishAction({ callback, connection, payload, sessionId, type }) {
  r.table('actions')
    .insert({
      payload,
      sessionId,
      timestamp: new Date(),
      type,
    })
    .run(connection)
    .then(result => {
      const id = result.generated_keys[0];
      return callback({ id });
    });
}

/**
 * Helper functions to subscribe and unsubscribe to websocket stream.
 */

/**
 * @description Subscribe client to session and users stream.
 * @param {Object} Object with params.
 * @param {Object} params.client - Websocket client.
 * @param {Object} params.connection - Database connection.
 * @param {string} params.id - Session id.
 */
function onSubscribeToSession({ client, connection, id }) {
  /** Emit session db updates to websocket clients */
  r.table('sessions')
    .get(id)
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor =>
      cursor.each((error, sessionRow) => {
        if (error) throw error;
        const { timestamp, topic, username } = sessionRow.new_val;
        client.emit(`session:${id}`, {
          timestamp,
          topic,
          hostUsername: username,
        });
      }),
    );

  /** Emit users db updates for session to websocket clients */
  r.table('users')
    .filter({ sessionId: id })
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor =>
      cursor.each((error, userRow) => {
        if (error) throw error;
        const { username } = userRow.new_val;
        client.emit(`sessionUsers:${id}`, {
          username,
        });
      }),
    );
}

/**
 * TODO: Unsubscribe from session info
 */
function onUnsubscribeSession({ client, connection, id, userId, userToken }) {
  console.log('onUnsubscribeSession id/username', id, userId, userToken);
  // In table 'sessionUsers', row with given id and username, is deleted
}

/**
 * @description Subscribe client to stream of session users.
 * @param {Object} Object with params.
 * @param {Object} params.client - Websocket client.
 * @param {Object} params.connection - Database connection.
 * @param {string} params.id - Session id.
 * @param {timestamp} params.from - From date/time onward.
 */
function onSubscribeToSessionUsers({ client, connection, id, from }) {
  let query = r.row('sessionId').eq(id);

  if (from) {
    query = query.and(r.row('timestamp').ge(new Date(from)));
  }

  return r
    .table('users')
    .orderBy({ index: 'timestamp' })
    .filter(query)
    .changes({ include_initial: true, include_types: true })
    .run(connection)
    .then(cursor => {
      cursor.each((error, userRow) => {
        if (error) throw error;
        const { userId, username } = userRow.new_val;
        console.log(
          'helpers.js: onSubscribeToSessionUser userId/usernames',
          userId,
          username,
        );
        client.emit(`sessionUsers:${id}`, { username });
      });
    });
}

/**
 * @description Subscribe client to stream of session actions.
 * @param {Object} Object with params.
 * @param {Object} params.client - Websocket client.
 * @param {Object} params.connection - Database connection.
 * @param {string} params.id - Session id.
 * @param {timestamp} params.from - From date/time onward.
 */
function onSubscribeToSessionActions({ client, connection, id, from }) {
  let query = r.row('sessionId').eq(id);

  if (from) {
    query = query.and(r.row('timestamp').ge(new Date(from)));
  }
  /** Emit action db updates for session to websocket clients */
  return r
    .table('actions')
    .orderBy({ index: 'timestamp' })
    .filter(query)
    .changes({ include_initial: true, include_types: true })
    .run(connection)
    .then(cursor => {
      cursor.each((error, actionRow) => {
        if (error) throw error;
        client.emit(`sessionActions:${id}`, actionRow.new_val);
      });
    });
}

/**
 * TODO: Unsubscribe from session actions
 */
function onUnsubscribeSessionActions({ client, connection, id }) {
  console.log('onUnsubscribeSessionActions id/username', id);
}

module.exports = {
  onPublishAction,
  onPublishSession,
  onPublishUser,
  onSubscribeToSession,
  onSubscribeToSessionActions,
  onSubscribeToSessionUsers,
  onUnpublishSession,
  onUnpublishUser,
  onUnsubscribeSession,
  onUnsubscribeSessionActions,
};
