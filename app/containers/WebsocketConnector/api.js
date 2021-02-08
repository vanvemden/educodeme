import openSocket from 'socket.io-client';
// import { fromEventPattern } from 'rxjs';
import { Observable, bufferTime } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEventPattern';

const port = 8000;
const socket = openSocket(`http://localhost:${port}`);

function publishSession({ id, topic, username }) {
  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('publishSession', { id, topic, username }, response => {
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
  console.log('in subscribeToSession:', id, username);
  socket.on(`sessionAction:${id}`);

  return new Promise((resolve, reject) => {
    let sent = false;
    socket.emit('subscribeToSession', { from: null, id, username }, data => {
      console.log('subscribeToSession data:', data);
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

function subscribeToConnectionEvent(callback) {
  // dispatch WEBSOCKET_CONNECTOR_ON_CONNECT
  socket.on('connect', () => callback({ state: 'connected', port }));
  // dispatch(websocketConnectorOnDisconnect)
  socket.on('disconnect', () => callback({ state: 'disconnected', port }));
  // dispatch(websocketConnectorOnConnectError)
  socket.on('connect_error', () => callback({ state: 'disconnected', port }));
}

export {
  publishSession,
  publishAction,
  subscribeToSession,
  subscribeToConnectionEvent,
};
