import openSocket from 'socket.io-client';
import { eventChannel } from 'redux-saga';

const port = 8000;
const socket = openSocket(`http://localhost:${port}`);

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

function unpublishSession({ id, token, username }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('unpublishSession', { id, token, username }, response => {
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

function publishAction({ payload, sessionId, type }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('publishAction', { payload, sessionId, type }, data => {
      sent = true;
      resolve(data);
    });
    setTimeout(() => {
      if (!sent) {
        reject();
      }
    }, 2000);
  });
}

function subscribeToSession({ id }) {
  // eslint-disable-next-line new-cap
  return new eventChannel(emit => {
    socket.on(`session:${id}`, action => {
      emit(action);
    });
    socket.on(`sessionUsers:${id}`, action => {
      emit(action);
    });
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
  subscribeToConnectionEvent,
  subscribeToSession,
  subscribeToSessionActions,
  unpublishSession,
  unsubscribeSession,
};
