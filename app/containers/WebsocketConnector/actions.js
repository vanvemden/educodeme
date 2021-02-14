import {
  WEBSOCKET_CONNECTOR_ACTION_RECEIVED,
  WEBSOCKET_CONNECTOR_ACTION_SENT,
  WEBSOCKET_CONNECTOR_GENERATE_ID,
  WEBSOCKET_CONNECTOR_ID_ONCHANGE,
  WEBSOCKET_CONNECTOR_PUBLISH_ACTION_FAILURE,
  WEBSOCKET_CONNECTOR_PUBLISH_ACTION_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_FAILURE,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_CONNECTION,
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
 * Action has been sent or received over websocket
 */
export function websocketConnectorActionReceived({ action }) {
  const { id, payload, timestamp, type } = action;
  return {
    payload: { id, payload, timestamp, type },
    type: WEBSOCKET_CONNECTOR_ACTION_RECEIVED,
  };
}
export function websocketConnectorActionSent({ action }) {
  const { id, payload, timestamp, type } = action;
  return {
    payload: { id, payload, timestamp, type },
    type: WEBSOCKET_CONNECTOR_ACTION_SENT,
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
export function websocketConnectorPublishSession({ id, topic, username }) {
  return {
    payload: { id, topic, username },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION,
  };
}

export function websocketConnectorPublishSessionFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION_FAILURE,
  };
}

export function websocketConnectorPublishSessionSuccess({ token }) {
  return {
    payload: { token },
    type: WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  };
}

/**
 * Subscribe to session, failure and success
 */
export function websocketConnectorSubscribeToSessionActions({ id, username }) {
  return {
    payload: { id, username },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  };
}

export function websocketConnectorSubscribeToSessionActionsFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_FAILURE,
  };
}

export function websocketConnectorSubscribeToSessionActionsSuccess() {
  return {
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_SUCCESS,
  };
}

/**
 * Form input
 */
export function websocketConnectorGenerateId({ id }) {
  return {
    payload: { id },
    type: WEBSOCKET_CONNECTOR_GENERATE_ID,
  };
}

export function websocketConnectorIdOnChange({ value }) {
  return {
    payload: { value },
    type: WEBSOCKET_CONNECTOR_ID_ONCHANGE,
  };
}

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
