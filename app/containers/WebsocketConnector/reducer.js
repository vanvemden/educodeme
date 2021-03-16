import produce from 'immer';

import {
  SOCKET_PUBLISHER_PUBLISH_SESSION_FAILURE,
  SOCKET_PUBLISHER_PUBLISH_SESSION_SUCCESS,
  SOCKET_PUBLISHER_PUBLISH_USER_FAILURE,
  SOCKET_PUBLISHER_PUBLISH_USER_SUCCESS,
  SOCKET_PUBLISHER_RECEIVE_ACTION,
  SOCKET_PUBLISHER_RECEIVE_USER,
  SOCKET_SESSION_TOPIC_ONCHANGE,
  SOCKET_SESSION_USERNAME_ONCHANGE,
  SOCKET_SUBSCRIBER_PUBLISH_USER_FAILURE,
  SOCKET_SUBSCRIBER_PUBLISH_USER_SUCCESS,
  SOCKET_SUBSCRIBER_RECEIVE_USER,
  SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS_FAILURE,
  SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS_SUCCESS,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_FAILURE,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS,
  SOCKET_SUBSCRIBER_UNPUBLISH_USER_SUCCESS,
} from './constants';

export const socketInitialState = {
  actions: [],
  connectionState: 'disconnected',
  failureErrors: [],
  isAutopilotOn: false,
  isConnected: false,
  isHost: true,
  isLoading: false,
  sessionId: null,
  sessionIsLivestream: null,
  sessionTimestamp: null,
  sessionToken: '',
  sessionTopic: '',
  sessionUsername: '',
  sessionUsers: [],
  userId: null,
  username: '',
  userToken: null,
};

/* eslint-disable default-case, no-param-reassign */
const socketReducer = (state = socketInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SOCKET_SESSION_TOPIC_ONCHANGE:
        draft.sessionTopic = action.payload.value;
        break;
      case SOCKET_SESSION_USERNAME_ONCHANGE:
        draft.username = action.payload.value;
        break;

      /**
       * Publisher
       */
      case SOCKET_PUBLISHER_PUBLISH_SESSION_SUCCESS:
        draft.isConnected = true;
        draft.isHost = true;
        draft.sessionUsername = action.payload.sessionUsername;
        draft.sessionId = action.payload.sessionId;
        draft.sessionTimestamp = action.payload.sessionTimestamp;
        draft.sessionToken = action.payload.sessionToken;
        break;
      case SOCKET_PUBLISHER_PUBLISH_SESSION_FAILURE:
        draft.isConnected = false;
        draft.failureErrors.push(action.payload.errors);
        break;

      case SOCKET_PUBLISHER_PUBLISH_USER_SUCCESS:
        draft.userId = action.payload.userId;
        draft.userToken = action.payload.userToken;
        break;
      case SOCKET_PUBLISHER_PUBLISH_USER_FAILURE:
        draft.isConnected = false;
        draft.failureErrors.push(action.payload.errors);
        break;

      case SOCKET_PUBLISHER_RECEIVE_ACTION:
        draft.actions.push({
          type: action.payload.type,
          payload: action.payload.payload,
        });
        break;

      case SOCKET_PUBLISHER_RECEIVE_USER:
        switch (action.payload.change) {
          case 'subscribe':
            draft.sessionUsers.push(action.payload.username);
            break;
          case 'unsubscribe':
            draft.sessionUsers = draft.sessionUsers.filter(
              username => username !== action.payload.username,
            );
            break;
        }
        break;

      /**
       * Subscriber
       */
      case SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS:
        draft.isHost = false;
        draft.sessionIsLivestream = action.payload.sessionIsLivestream;
        draft.sessionId = action.payload.sessionId;
        draft.sessionTimestamp = action.payload.sessionTimestamp;
        draft.sessionTopic = action.payload.sessionTopic;
        draft.sessionUsername = action.payload.sessionUsername;
        break;
      case SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_FAILURE:
        draft.isConnected = false;
        break;

      case SOCKET_SUBSCRIBER_PUBLISH_USER_SUCCESS:
        draft.userId = action.payload.userId;
        draft.userToken = action.payload.userToken;
        break;
      case SOCKET_SUBSCRIBER_PUBLISH_USER_FAILURE:
        draft.isConnected = false;
        draft.failureErrors.push(action.payload.errors);
        break;

      case SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS_SUCCESS:
        draft.isConnected = true;
        break;
      case SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS_FAILURE:
        draft.isConnected = false;
        break;

      case SOCKET_SUBSCRIBER_UNPUBLISH_USER_SUCCESS:
        draft.isConnected = false;
        draft.userId = socketInitialState.userId;
        draft.userToken = socketInitialState.userToken;
        break;

      case SOCKET_SUBSCRIBER_RECEIVE_USER:
        switch (action.payload.change) {
          case 'subscribe':
            draft.sessionUsers.push(action.payload.username);
            break;
          case 'unsubscribe':
            draft.sessionUsers = draft.sessionUsers.filter(
              username => username !== action.payload.username,
            );
            break;
        }
        break;

      // --------

      // case WEBSOCKET_CONNECTOR_SESSION_ACTION_FROM_WEBSOCKET:
      //   draft.actions.push({
      //     type: action.payload.type,
      //     payload: action.payload.payload,
      //   });
      //   break;
      // case WEBSOCKET_CONNECTOR_RESET:
      //   draft = socketInitialState;
      //   break;
      // case WEBSOCKET_CONNECTOR_SUBSCRIBE_INIT:
      //   draft.isHost = false;
      //   console.log(
      //     'In reducer / WEBSOCKET_CONNECTOR_SUBSCRIBE_INIT isHost=',
      //     draft.isHost,
      //   );
      //   break;
      // case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS_FROM_WEBSOCKET:
      //   draft.sessionUsers.push(action.payload.username);
      //   break;

      // case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_FAILURE:
      //   draft.isConnected = false;
      //   draft.errors = action.payload.errors;
      //   break;
      // case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_SUCCESS:
      //   draft.isConnected = true;
      //   draft.isSubscribedToSessionActions = true;
      //   break;
      // case WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_SUCCESS:
      //   draft.isSubscribedToSessionUsers = true;
      //   break;
      // case WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE:
      //   draft.sessionTopic = action.payload.value;
      //   break;
      // case WEBSOCKET_CONNECTOR_USERNAME_ONCHANGE:
      //   draft.username = action.payload.value;
      //   break;

      // case WEBSOCKET_CONNECTOR_PUBLISH_USER_SUCCESS:
      //   draft.userId = action.payload.userId;
      //   draft.userToken = action.payload.userToken;
      //   break;
      // case WEBSOCKET_CONNECTOR_SESSION_USER_FROM_WEBSOCKET:
      //   draft.sessionUsers.push(action.payload.username);
      //   break;
    }
  });

export default socketReducer;
