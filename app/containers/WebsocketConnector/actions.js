import {
  WEBSOCKET_CONNECTOR_PUBLISH_ACTION_FAILURE,
  WEBSOCKET_CONNECTOR_PUBLISH_ACTION_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_FAILURE,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_PUBLISH_USER_FAILURE,
  WEBSOCKET_CONNECTOR_PUBLISH_USER_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_USER,
  WEBSOCKET_CONNECTOR_SESSION_ACTION_RECEIVED,
  WEBSOCKET_CONNECTOR_SESSION_ACTION_SENT,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_FAILURE,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_SUCCESS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_FAILURE,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_FAILURE,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_SUCCESS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE,
  WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION_FAILURE,
  WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_UNPUBLISH_USER_FAILURE,
  WEBSOCKET_CONNECTOR_UNPUBLISH_USER_SUCCESS,
  WEBSOCKET_CONNECTOR_UNPUBLISH_USER,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS_FAILURE,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS_SUCCESS,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_FAILURE,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_USERS_FAILURE,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_USERS_SUCCESS,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_USERS,
  WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION,
  WEBSOCKET_CONNECTOR_USERNAME_ONCHANGE,
} from './constants';

/**
 * @description Dispatched by host when starting a livestream session.
 * @param {Object} Object with params.
 * @param {string} params.topic - Session topic.
 * @param {string} params.username - Host username.
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorPublishSession({ topic, username }) {
  return {
    payload: { topic, username },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  };
}

/**
 * @description Dispatched when starting a livestream session failed.
 * @param {Object} Object with params.
 * @param {Object} params.error - Error object.
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorPublishSessionFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION_FAILURE,
  };
}

/**
 * @description Dispatched when starting a livestream session was success.
 * @param {Object} Object with params.
 * @param {string} params.id - Session id.
 * @param {timestamp} params.timestamp - Published date/time.
 * @param {string} params.token - Session token.
 * @param {string} params.userId = Host session-user id.
 * @param {username} params.username - Host username
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorPublishSessionSuccess({
  id,
  timestamp,
  token,
  topic,
  username,
}) {
  return {
    payload: { id, timestamp, token, topic, username },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  };
}

/**
 * @description Dispatched to publish a user.
 * @param {Object} Object with params.
 * @param {string} params.sessionId - Session Id.
 * @param {string} params.username - Host username.
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorPublishUser({ sessionId, username }) {
  return {
    payload: { sessionId, username },
    type: WEBSOCKET_CONNECTOR_PUBLISH_USER,
  };
}

/**
 * @description Dispatched when publish a user failed.
 * @param {Object} Object with params.
 * @param {Object} params.error - Error object.
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorPublishUserFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_PUBLISH_USER_FAILURE,
  };
}

/**
 * @description Dispatched when publish a user was success.
 * @param {Object} Object with params.
 * @param {string} params.id - User id.
 * @param {string} params.sessionId - Session id.
 * @param {string} params.token - User token.
 * @param {username} params.username - Username
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorPublishUserSuccess({
  id,
  sessionId,
  token,
  username,
}) {
  return {
    payload: { id, sessionId, token, username },
    type: WEBSOCKET_CONNECTOR_PUBLISH_USER_SUCCESS,
  };
}

/**
 * @description Dispatched to unpublish a user.
 * @param {Object} Object with params.
 * @param {string} params.topic - Session topic.
 * @param {string} params.username - Host username.
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorUnpublishUser({ id, sessionId, token }) {
  return {
    payload: { id, sessionId, token },
    type: WEBSOCKET_CONNECTOR_UNPUBLISH_USER,
  };
}

/**
 * @description Dispatched when unpublish user failed.
 * @param {Object} Object with params.
 * @param {Object} params.error - Error object.
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorUnpublishUserFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_UNPUBLISH_USER_FAILURE,
  };
}

/**
 * @description Dispatched when unpublish user was success.
 * @param {Object} Object with params.
 * @param {string} params.id - User id.
 * @param {string} params.sessionId - Session id.
 * @param {string} params.token - User token.
 * @param {username} params.username - Username
 * @return {Object} Object with action type and payload.
 */
export function websocketConnectorUnpublishUserSuccess({ id, sessionId }) {
  return {
    payload: { id, sessionId },
    type: WEBSOCKET_CONNECTOR_UNPUBLISH_USER_SUCCESS,
  };
}

/**
 * Session action was received over websocket connection
 * @param {Object} payload - Action payload.
 * @param {uuid} .id - Session id.
 * @param {Object} payload.payload - Payload of action received.
 * @param {timestamp} payload.timestamp - Publish data/time.
 * @param {string} payload.type - Action type.
 */
export function websocketConnectorSessionActionReceived({
  id,
  payload,
  timestamp,
  type,
}) {
  return {
    payload: { id, payload, timestamp, type },
    type: WEBSOCKET_CONNECTOR_SESSION_ACTION_RECEIVED,
  };
}
export function websocketConnectorSessionActionSent({ action }) {
  const { id, payload, timestamp, type } = action;
  return {
    payload: { id, payload, timestamp, type },
    type: WEBSOCKET_CONNECTOR_SESSION_ACTION_SENT,
  };
}

/**
 * Called action was published, handle saga failure and success here.
 */
export function websocketConnectorPublishActionFailure({ action }) {
  return {
    payload: { action },
    type: WEBSOCKET_CONNECTOR_PUBLISH_ACTION_FAILURE,
  };
}
export function websocketConnectorPublishActionSuccess({
  id,
  index,
  payload,
  sessionId,
  type,
}) {
  return {
    payload: { id, index, payload, sessionId, type },
    type: WEBSOCKET_CONNECTOR_PUBLISH_ACTION_SUCCESS,
  };
}

/**
 * Unpublish session, failure and success
 */
export function websocketConnectorUnpublishSession({ id, token, username }) {
  return {
    payload: { id, token, username },
    type: WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION,
  };
}

export function websocketConnectorUnpublishSessionFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION_FAILURE,
  };
}

export function websocketConnectorUnpublishSessionSuccess() {
  return {
    type: WEBSOCKET_CONNECTOR_UNPUBLISH_SESSION_SUCCESS,
  };
}

/**
 * Subscribe to receive session data, failure and success
 */
export function websocketConnectorSubscribeToSession({ id }) {
  return {
    payload: { id },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  };
}

export function websocketConnectorSubscribeToSessionFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_FAILURE,
  };
}

export function websocketConnectorSubscribeToSessionSuccess({
  hostUsername,
  id,
  timestamp,
  topic,
}) {
  return {
    payload: { hostUsername, id, timestamp, topic },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS,
  };
}

/**
 * Unsubscribe from receiving session data, failure and success
 */
export function websocketConnectorUnsubscribeSession({ id, username }) {
  return {
    payload: { id, username },
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION,
  };
}

export function websocketConnectorUnsubscribeSessionFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_FAILURE,
  };
}

export function websocketConnectorUnsubscribeSessionSuccess() {
  return {
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_SUCCESS,
  };
}

/**
 * Subscribe to receive session actions, failure and success
 */
export function websocketConnectorSubscribeToSessionActions({ id }) {
  return {
    payload: { id },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
  };
}

export function websocketConnectorSubscribeToSessionActionsFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_FAILURE,
  };
}

export function websocketConnectorSubscribeToSessionActionsSuccess() {
  return {
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_SUCCESS,
  };
}

/**
 * Unsubscribe to receive session actions, and handle failure and success
 */
export function websocketConnectorUnsubscribeSessionActions({ id }) {
  return {
    payload: { id },
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS,
  };
}

export function websocketConnectorUnsubscribeSessionActionsFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS_FAILURE,
  };
}

export function websocketConnectorUnsubscribeSessionActionsSuccess() {
  return {
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_ACTIONS_SUCCESS,
  };
}

/**
 * Subscribe to receive session users, failure and success
 */
export function websocketConnectorSubscribeToSessionUsers({ id }) {
  return {
    payload: { id },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS,
  };
}

export function websocketConnectorSubscribeToSessionUsersFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_FAILURE,
  };
}

export function websocketConnectorSubscribeToSessionUsersSuccess() {
  return {
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_USERS_SUCCESS,
  };
}

/**
 * Unsubscribe to receive session actions, and handle failure and success
 */
export function websocketConnectorUnsubscribeSessionUsers({ id }) {
  return {
    payload: { id },
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_USERS,
  };
}

export function websocketConnectorUnsubscribeSessionUsersFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_USERS_FAILURE,
  };
}

export function websocketConnectorUnsubscribeSessionUsersSuccess() {
  return {
    type: WEBSOCKET_CONNECTOR_UNSUBSCRIBE_SESSION_USERS_SUCCESS,
  };
}

/**
 * Form input
 */
export function websocketConnectorTopicOnChange({ value }) {
  return {
    payload: { value },
    type: WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE,
  };
}

export function websocketConnectorUsernameOnChange({ value }) {
  return {
    payload: { value },
    type: WEBSOCKET_CONNECTOR_USERNAME_ONCHANGE,
  };
}
