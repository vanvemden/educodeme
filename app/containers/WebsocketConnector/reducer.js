import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';

import {
  WEBSOCKET_CONNECTOR_CONNECT_FROM_WEBSOCKET,
  WEBSOCKET_CONNECTOR_CONNECT,
  WEBSOCKET_CONNECTOR_DISCONNECT_FROM_WEBSOCKET,
  WEBSOCKET_CONNECTOR_DISCONNECT,
  WEBSOCKET_CONNECTOR_PUBLISH_ACTION_FAILURE,
  WEBSOCKET_CONNECTOR_PUBLISH_ACTION_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_RESET,
  WEBSOCKET_CONNECTOR_SESSION_ACTION_RECEIVED,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_FAILURE,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_SUCCESS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE_FROM_WEBSOCKET,
  WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE,
  WEBSOCKET_CONNECTOR_USERNAME_ONCHANGE,
} from './constants';

export const websocketConnectorInitialState = {
  actions: [],
  connectionState: 'disconnected',
  errors: [],
  hostUsername: '',
  id: null,
  isAutopilotOn: false,
  isConnected: false,
  isHost: true,
  isLoading: false,
  timestamp: null,
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
      case WEBSOCKET_CONNECTOR_PUBLISH_ACTION_FAILURE:
        draft.actions.push({
          type: action.payload.type,
          payload: action.payload.payload,
        });
        break;
      case WEBSOCKET_CONNECTOR_PUBLISH_ACTION_SUCCESS:
        draft.actions.push({
          type: action.payload.type,
          payload: action.payload.payload,
        });
        break;
      case WEBSOCKET_CONNECTOR_SESSION_ACTION_RECEIVED:
        draft.actions.push({
          type: action.payload.type,
          payload: action.payload.payload,
        });
        break;
      case WEBSOCKET_CONNECTOR_RESET:
        draft = websocketConnectorInitialState;
        break;
      case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS:
        draft.hostUsername = action.payload.hostUsername;
        draft.id = action.payload.id;
        draft.isHost = false;
        draft.timestamp = action.payload.timestamp;
        draft.topic = action.payload.topic;
        break;

      // WHAT CODE BELOW THIS COMMENT DO WE STILL NEED?
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
      case WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS:
        draft.id = action.payload.id;
        draft.isConnected = true;
        draft.isHost = true;
        draft.timestamp = action.payload.timestamp;
        draft.token = action.payload.token;
        break;
      case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_FAILURE:
        draft.isConnected = false;
        draft.errors = action.payload.errors;
        break;
      case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_SUCCESS:
        draft.isConnected = true;
        draft.isHost = false;
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
