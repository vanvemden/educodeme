import {
  WEBSOCKET_CONNECTOR_SESSION_ACTION_SENT,
  WEBSOCKET_CONNECTOR_PUBLISH_ACTION_FAILURE,
  WEBSOCKET_CONNECTOR_PUBLISH_ACTION_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_FAILURE,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_SESSION_ACTION_RECEIVED,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_CONNECTION,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_FAILURE,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS_SUCCESS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_ACTIONS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_FAILURE,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  WEBSOCKET_CONNECTOR_TOPIC_ONCHANGE,
  WEBSOCKET_CONNECTOR_USERNAME_ONCHANGE,
} from './constants';

/**
 * Subscribe to connection
 */
export function websocketConnectorSubscribeToConnection() {
  return {
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_CONNECTION,
  };
}

/**
 * Session action has been sent or received over websocket
 */
export function websocketConnectorSessionActionReceived({ action }) {
  console.log(action);
  const { id, payload, timestamp, type } = action;
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
  console.log(id, index, payload, type);
  return {
    payload: { id, index, payload, sessionId, type },
    type: WEBSOCKET_CONNECTOR_PUBLISH_ACTION_SUCCESS,
  };
}

/**
 * Publish session, failure and success
 */
export function websocketConnectorPublishSession({ topic, username }) {
  return {
    payload: { topic, username },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  };
}

export function websocketConnectorPublishSessionFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION_FAILURE,
  };
}

export function websocketConnectorPublishSessionSuccess({ id, token }) {
  return {
    payload: { id, token },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
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
