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
    .then(callback({ token }));
}

/**
 * Client subscribes to a session
 */
function onSubscribeToSessions({ client, connection }) {
  r.table('sessions')
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor => {
      cursor.each((err, sessionRow) =>
        client.emit('session', sessionRow.new_val),
      );
    });
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
    .then(callback('works!'));
}

function onSubscribeToSession({ client, connection, id, from }) {
  console.log('client', client, ' subscribing to:', id);
  let query = r.row('sessionId').eq(id);

  if (from) {
    query = query.and(r.row('timestamp').ge(new Date(from)));
  }

  return r
    .table('actions')
    .filter(query)
    .changes({ include_initial: true, include_types: true })
    .run(connection)
    .then(cursor => {
      cursor.each((err, actionRow) =>
        client.emit(`sessionAction:${id}`, actionRow.new_val),
      );
    });
}

module.exports = {
  onPublishAction,
  onPublishSession,
  onSubscribeToSession,
  onSubscribeToSessions,
};