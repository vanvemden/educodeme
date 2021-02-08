import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';

import {
  WEBSOCKET_CONNECTOR_CONNECT_FROM_WEBSOCKET,
  WEBSOCKET_CONNECTOR_CONNECT,
  WEBSOCKET_CONNECTOR_DISCONNECT_FROM_WEBSOCKET,
  WEBSOCKET_CONNECTOR_DISCONNECT,
  WEBSOCKET_CONNECTOR_GENERATE_ID,
  WEBSOCKET_CONNECTOR_ID_ONCHANGE,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_RESET,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_FAILURE,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE_FROM_WEBSOCKET,
  WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE,
  WEBSOCKET_CONNECTOR_USERNAME_ONCHANGE,
} from './constants';

export const websocketConnectorInitialState = {
  connectionState: 'disconnected',
  id: uuidv4(),
  isAutopilotOn: false,
  isConnected: false,
  isHost: true,
  connectedUsers: [],
  token: '',
  topic: '',
  username: '',
};

/* eslint-disable default-case, no-param-reassign */
const websocketConnectorReducer = (
  state = websocketConnectorInitialState,
  action,
) =>
  produce(state, draft => {
    switch (action.type) {
      case WEBSOCKET_CONNECTOR_RESET:
        draft = websocketConnectorInitialState;
        break;
      case WEBSOCKET_CONNECTOR_CONNECT:
        draft.connectedUsers.push(action.payload.username);
        draft.isConnected = true;
        break;
      case WEBSOCKET_CONNECTOR_CONNECT_FROM_WEBSOCKET:
        draft.connectedUsers.push(action.payload.username);
        break;
      case WEBSOCKET_CONNECTOR_DISCONNECT:
        draft.isConnected = false;
        draft.connectedUsers.filter(name => name === action.payload.username);
        break;
      case WEBSOCKET_CONNECTOR_DISCONNECT_FROM_WEBSOCKET:
        draft.connectedUsers.filter(name => name === action.payload.username);
        break;
      case WEBSOCKET_CONNECTOR_GENERATE_ID:
        draft.id = action.payload.id;
        break;
      case WEBSOCKET_CONNECTOR_ID_ONCHANGE:
        draft.id = action.payload.value;
        break;
      case WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS:
        draft.token = action.payload.token;
        break;
      case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_FAILURE:
        console.log(
          'in reducer WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_FAILURE',
          action,
        );
        break;
      case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS:
        console.log(
          'in reducer WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS',
          action,
        );
        break;
      case WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE:
        draft.topic = action.payload.value;
        break;
      case WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE_FROM_WEBSOCKET:
        draft.topic = action.payload.value;
        break;
      case WEBSOCKET_CONNECTOR_USERNAME_ONCHANGE:
        draft.username = action.payload.value;
        break;
    }
  });

export default websocketConnectorReducer;
