import openSocket from 'socket.io-client';
import { eventChannel } from 'redux-saga';

import { WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_FROM_WEBSOCKET } from './constants';
const port = 8000;
const socket = openSocket(`http://localhost:${port}`);

/**
 * Api calls for publish and unpublish events.
 */

/**
 * @description Api call to start livestream session on server.
 * @param {Object} Object with params.
 * @param {string} params.topic - Session topic.
 * @param {string} params.username - Host username.
 * @return {Object} Response from server.
 */
function publishSession({ topic, username }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('publishSession', { topic, username }, response => {
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
 * @param {string} params.id - Session id.
 * @param {string} params.token - Session token.
 * @return {Object} Response from server.
 */
function unpublishSession({ id, token }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('unpublishSession', { id, token }, response => {
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
 * @param {string} params.id - User id.
 * @param {string} params.sessionId - Session id.
 * @param {string} params.userToken - User token.
 * @return {Object} Response from server.
 */
function unpublishUser({ id, sessionId, token }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('unpublishUser', { id, sessionId, token }, response => {
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
function subscribeToSession({ id }) {
  // eslint-disable-next-line new-cap
  return new eventChannel(emit => {
    /** Register handler for event */
    socket.on(`session:${id}`, action => {
      emit(action);
    });
    socket.on(`sessionUsers:${id}`, ({ username }) => {
      emit({
        type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_FROM_WEBSOCKET,
        payload: { username },
      });
    });
    /** Subscribe to the event */
    socket.emit('subscribeToSession', { id });
    return () => {};
  });
}

function unsubscribeSession({ id, username }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.removeAllListeners(`session:${id}`);
    socket.removeAllListeners(`sessionActions:${id}`);
    socket.removeAllListeners(`sessionUsers:${id}`);
    socket.emit('unsubscribeSession', { id, username }, response => {
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

function subscribeToSessionActions({ id }) {
  // eslint-disable-next-line new-cap
  return new eventChannel(emit => {
    socket.on(`sessionActions:${id}`, action => {
      emit(action);
    });
    socket.emit('subscribeToSessionActions', { id });
    return () => {};
  });
}

function subscribeToSessionUsers({ id }) {
  // eslint-disable-next-line new-cap
  return new eventChannel(emit => {
    socket.on(`sessionUsers:${id}`, ({ username }) => {
      emit({
        type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_FROM_WEBSOCKET,
        payload: { username },
      });
    });
    socket.emit('subscribeToSessionUsers', { id });
    return () => {};
  });
}

function subscribeToConnectionEvent(callback) {
  // dispatch WEBSOCKET_CONNECTOR_ON_CONNECT
  socket.on('connect', () => callback({ state: 'connected', port }));
  // dispatch(websocketConnectorOnDisconnect)
  socket.on('disconnect', () => callback({ state: 'disconnected', port }));
  // dispatch(websocketConnectorOnConnectError)
  socket.on('connect_error', () => callback({ state: 'disconnected', port }));
}

export {
  publishAction,
  publishSession,
  publishUser,
  subscribeToConnectionEvent,
  subscribeToSession,
  subscribeToSessionActions,
  subscribeToSessionUsers,
  unpublishSession,
  unpublishUser,
  unsubscribeSession,
};
