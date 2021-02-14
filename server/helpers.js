const r = require('rethinkdb');

/**
 * Client publishes a session
 */
function onPublishSession({ callback, connection, id, topic, username }) {
  const token = '!UNIQUE_HOST_TOKEN!';
  return r
    .table('sessions')
    .insert({
      id,
      timestamp: new Date(),
      token,
      topic,
      username,
    })
    .run(connection)
    .then(token => callback({ token }));
}

/**
 * Client subscribes to a session
 */
function onSubscribeToSession({ client, connection, id }) {
  r.table('sessions')
    .get(id)
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor =>
      cursor.each((err, sessionRow) => {
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

function onSubscribeToSessionActions({ client, connection, id, from }) {
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
      cursor.each((err, actionRow) => {
        client.emit(`sessionActions:${id}`, actionRow.new_val);
      });
    });
}

module.exports = {
  onPublishAction,
  onPublishSession,
  onSubscribeToSession,
  onSubscribeToSessionActions,
};
