const { times } = require('lodash');
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
 * @param {string} params.sessionTopic - Session sessionTopic.
 * @param {string} params.username - Session host username.
 * @returns {Object} response - The generated session fields.
 * @returns {string} response.id - Session Id.
 * @returns {timestamp} response.timestamp - Session created timestamp.
 * @returns {string} response.token - Session token.
 */
function onPublishSession({ callback, connection, sessionTopic, username }) {
  console.log('onPublishSession', sessionTopic, username);
  const token = uuidv4();
  const timestamp = new Date();
  return r
    .table('sessions')
    .insert({
      isLivestream: true,
      timestamp,
      token,
      sessionTopic,
      username,
    })
    .run(connection)
    .then(result => {
      const sessionId = result.generated_keys[0];
      return callback({
        sessionId,
        sessionIsLivestream: true,
        sessionTimestamp: timestamp,
        sessionToken: token,
        sessionTopic,
        sessionUsername: username,
      });
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
function onUnpublishSession({ callback, connection, sessionId, sessionToken }) {
  return r
    .table('sessions')
    .filter([{ id: sessionId }, { token: sessionToken }])
    .update({ isLivestream: false })
    .run(connection)
    .then(result => callback({ result, sessionId }));
}

/**
 * @description Helper to insert session user into db.
 * @param {Object} Object with params.
 * @param {function} params.callback - Callback function.
 * @param {Object} params.connection - Database connection.
 * @param {string} params.sessionId - Session id.
 * @param {string} params.username - Username.
 * @returns {Object} response - The generated user fields.
 * @returns {string} response.userId
 * @returns {string} response.sessionToken
 */
function onPublishUser({ callback, connection, sessionId, username }) {
  const token = uuidv4();
  const timestamp = new Date();
  r.table('users')
    .insert({
      sessionId,
      timestamp,
      token,
      username,
    })
    .run(connection)
    .then(result => {
      const userId = result.generated_keys[0];
      return callback({
        sessionId,
        timestamp,
        userToken: token,
        userId,
        username,
      });
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
function onUnpublishUser({
  callback,
  connection,
  sessionId,
  userToken,
  userId,
}) {
  r.table('users')
    .filter({ id: userId, sessionId, token: userToken })
    .delete()
    .run(connection)
    .then(result => {
      callback({ result });
    });
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
      const actionId = result.generated_keys[0];
      return callback({ actionId, payload, sessionId, type });
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
function onSubscribeSession({ client, connection, sessionId }) {
  /** Emit session db updates to websocket clients */
  r.table('sessions')
    .get(sessionId)
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor =>
      cursor.each((error, sessionRow) => {
        console.log('sessionRow', sessionRow);
        if (error) throw error;
        if (sessionRow.new_val) {
          const {
            isLivestream: sessionIsLivestream,
            timestamp: sessionTimestamp,
            sessionTopic,
            username: sessionUsername,
          } = sessionRow.new_val;
          client.emit(`session:${sessionId}`, {
            sessionIsLivestream,
            sessionTimestamp,
            sessionTopic,
            sessionUsername,
          });
        } else if (sessionRow.old_val) {
          const {
            isLivestream: sessionIsLivestream,
            sessionTopic,
          } = sessionRow.old_val;
          client.emit(`session:${sessionId}`, {
            sessionIsLivestream,
            sessionTopic,
          });
        }
      }),
    );
}

/**
 * TODO: Unsubscribe from session info
 */
function onUnsubscribeSession({
  client,
  connection,
  sessionId,
  userId,
  userToken,
}) {
  console.log('onUnsubscribeSession id/username', sessionId, userId, userToken);
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
function onSubscribeUsers({ client, connection, from, sessionId }) {
  let query = r.row('sessionId').eq(sessionId);

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
        if (userRow.new_val) {
          const { username } = userRow.new_val;
          client.emit(`sessionUsers:${sessionId}`, {
            change: 'subscribe',
            username,
          });
        } else if (userRow.old_val) {
          const { username } = userRow.old_val;
          client.emit(`sessionUsers:${sessionId}`, {
            change: 'unsubscribe',
            username,
          });
        }
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
function onSubscribeActions({ client, connection, sessionId, from }) {
  let query = r.row('sessionId').eq(sessionId);

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
        client.emit(`sessionActions:${sessionId}`, actionRow.new_val);
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
  onSubscribeSession,
  onSubscribeActions,
  onSubscribeUsers,
  onUnpublishSession,
  onUnpublishUser,
  onUnsubscribeSession,
  onUnsubscribeSessionActions,
};
