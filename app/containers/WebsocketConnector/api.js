import openSocket from 'socket.io-client';
import { eventChannel } from 'redux-saga';

const port = 8000;
const socket = openSocket(`http://localhost:${port}`);

/**
 * Api calls for publish and unpublish events.
 */

/**
 * @description Api call to start livestream session on server.
 * @param {Object} Object with params.
 * @param {string} params.sessionTopic
 * @param {string} params.username
 * @return {Object} Response from server.
 */
function publishSession({ sessionTopic, username }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('publishSession', { sessionTopic, username }, response => {
      sent = true;
      resolve(response);
    });
    setTimeout(() => {
      if (!sent) {
        reject();
      }
    }, 2000);
  });
}

/**
 * @description Api call to stop livestream session on server.
 * @param {Object} Object with params.
 * @param {string} params.sessionId
 * @param {string} params.token - Session token.
 * @return {Object} Response from server.
 */
function unpublishSession({ sessionId, sessionToken }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('unpublishSession', { sessionId, sessionToken }, response => {
      sent = true;
      resolve(response);
    });
    setTimeout(() => {
      if (!sent) {
        reject();
      }
    }, 2000);
  });
}

/**
 * @description Api call to add session user.
 * @param {Object} Object with params.
 * @param {string} params.sessionId - Session id.
 * @param {string} params.username - Username.
 * @return {Object} Response from server.
 */
function publishUser({ sessionId, username }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('publishUser', { sessionId, username }, response => {
      sent = true;
      resolve(response);
    });
    setTimeout(() => {
      if (!sent) {
        reject();
      }
    }, 2000);
  });
}

/**
 * @description Api call to disconnect user from session.
 * @param {Object} Object with params.
 * @param {string} params.userId
 * @param {string} params.sessionId
 * @param {string} params.userToken
 * @return {Object} Response from server.
 */
function unpublishUser({ sessionId, userId, userToken }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('unpublishUser', { sessionId, userId, userToken }, response => {
      sent = true;
      resolve(response);
    });
    setTimeout(() => {
      if (!sent) {
        reject();
      }
    }, 2000);
  });
}

/**
 * @description Api call to add session action.
 * @param {Object} Object with params.
 * @param {string} params.payload - Action payload.
 * @param {string} params.sessionId - Session id.
 * @param {type} params.type - Action type.
 * @return {Object} Response from server.
 */
function publishAction({ payload, sessionId, type }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('publishAction', { payload, sessionId, type }, response => {
      sent = true;
      resolve(response);
    });
    setTimeout(() => {
      if (!sent) {
        reject();
      }
    }, 2000);
  });
}

/**
 * Api calls for subscribe and unsubscribe events.
 */

/**
 * @description Api call to subscribe client to session stream.
 * @param {Object} Object with params.
 * @param {string} params.id - Session id.
 */
function subscribeSession({ sessionId }) {
  // eslint-disable-next-line new-cap
  return new eventChannel(emit => {
    /** Register handler for event */
    socket.on(
      `session:${sessionId}`,
      ({
        sessionIsLivestream,
        sessionTimestamp,
        sessionTopic,
        sessionUsername,
      }) => {
        emit({
          sessionIsLivestream,
          sessionTimestamp,
          sessionTopic,
          sessionUsername,
        });
      },
    );
    socket.emit('subscribeSession', { sessionId });
    return () => {};
  });
}

/**
 * @description Api call to unsubscribe from session stream.
 * @param {Object} Object with params.
 * @param {string} params.sessionId
 * @param {string} params.userId
 * @param {string} params.userToken
 */
// function unsubscribeSession({ sessionId, userId, userToken }) {
//   console.log(' api unsubscribeSession ', sessionId, userId, userToken);
//   return new Promise((resolve, reject) => {
//     let sent = false;
//     socket.emit(
//       'unsubscribeSession',
//       { sessionId, userId, userToken },
//       response => {
//         sent = true;
//         socket.removeAllListeners(`session:${sessionId}`);
//         socket.removeAllListeners(`sessionActions:${sessionId}`);
//         socket.removeAllListeners(`sessionUsers:${sessionId}`);
//         console.log('in unsubscribeSession', socket);
//         resolve(response);
//       },
//     );
//     setTimeout(() => {
//       if (!sent) {
//         reject();x
//       }
//     }, 2000);
//   });
// }

function subscribeActions({ sessionId }) {
  // eslint-disable-next-line new-cap
  return new eventChannel(emit => {
    socket.on(`sessionActions:${sessionId}`, action => {
      emit(action);
    });
    socket.emit('subscribeActions', { sessionId });
    return () => {};
  });
}

function subscribeUsers({ sessionId }) {
  // eslint-disable-next-line new-cap
  return new eventChannel(emit => {
    socket.on(`sessionUsers:${sessionId}`, ({ change, username }) => {
      emit({ change, username });
    });
    socket.emit('subscribeUsers', { sessionId });
    return () => {};
  });
}

function subscribeConnectionEvent(callback) {
  // dispatch WEBSOCKET_CONNECTOR_ON_CONNECT
  socket.on('connect', () => callback({ state: 'connected', port }));
  // dispatch(websocketConnectorOnDisconnect)
  socket.on('disconnect', () => callback({ state: 'disconnected', port }));
  // dispatch(websocketConnectorOnConnectError)
  socket.on('connect_error', () => callback({ state: 'disconnected', port }));
}

function unsubscribeActions({ sessionId }) {
  socket.removeAllListeners(`sessionActions:${sessionId}`);
}

function unsubscribeSession({ sessionId }) {
  socket.removeAllListeners(`session:${sessionId}`);
}

function unsubscribeUsers({ sessionId }) {
  socket.removeAllListeners(`sessionUsers:${sessionId}`);
}

export {
  publishAction,
  publishSession,
  publishUser,
  subscribeActions,
  subscribeConnectionEvent,
  subscribeSession,
  subscribeUsers,
  unpublishSession,
  unpublishUser,
  unsubscribeActions,
  unsubscribeSession,
  unsubscribeUsers,
};
