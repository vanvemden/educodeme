const r = require('rethinkdb');
const { v4: uuidv4 } = require('uuid');
/**
 * Publish (start) session
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
 * Unpublish (end) session
 */
function onUnpublishSession({ callback, connection, id, token, username }) {
  return r
    .table('sessions')
    .get(id)
    .update({ isLivestream: false })
    .run(connection)
    .then(result => {
      return callback({ result });
    });
}

/**
 * Subscribe to session info
 */
function onSubscribeToSession({ client, connection, id }) {
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
  // Add listener to sessionUsers table changes
}

/**
 * Unsubscribe from session info
 */
function onUnsubscribeSession({ client, connection, id, username }) {
  console.log('onUnsubscribeSession id/username', id, username);
  // In table 'sessionUsers', row with given id and username, is deleted
}

/**
 * Client publishes an action of a session
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
    .then(cursor => callback({ cursor }));
}

/**
 * Subscribe to session actions
 */
function onSubscribeToSessionActions({
  client,
  connection,
  id,
  from,
  username,
}) {
  // Inject username into sessionUsers table
  let query = r.row('sessionId').eq(id);

  if (from) {
    query = query.and(r.row('timestamp').ge(new Date(from)));
  }

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
 * Unsubscribe from session actions
 */
function onUnsubscribeSessionActions({ client, connection, id, username }) {
  console.log('onUnsubscribeSessionActions id/username', id, username);
}

module.exports = {
  onPublishAction,
  onPublishSession,
  onSubscribeToSession,
  onSubscribeToSessionActions,
  onUnpublishSession,
  onUnsubscribeSession,
  onUnsubscribeSessionActions,
};
