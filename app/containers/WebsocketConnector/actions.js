import {
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
 * Actions are published in saga, handle failure and success here.
 */
export function websocketConnectorPublishActionFailure() {
  return {
    type: WEBSOCKET_CONNECTOR_PUBLISH_ACTION_FAILURE,
  };
}
export function websocketConnectorPublishActionSuccess({ container }) {
  return {
    payload: { container },
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
export function websocketConnectorSubscribeToSession({ id, username }) {
  console.log('websocketConnectorSubscribeToSession: ', id, username);
  return {
    payload: { id, username },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
  };
}

export function websocketConnectorSubscribeToSessionFailure({ error }) {
  return {
    payload: { error },
    type: WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION_FAILURE,
  };
}

export function websocketConnectorSubscribeToSessionSuccess() {
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
