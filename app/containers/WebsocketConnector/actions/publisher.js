import {
  SOCKET_PUBLISHER_PUBLISH_ACTION_FAILURE,
  SOCKET_PUBLISHER_PUBLISH_ACTION_SUCCESS,
  SOCKET_PUBLISHER_PUBLISH_ACTION,
  SOCKET_PUBLISHER_PUBLISH_SESSION_FAILURE,
  SOCKET_PUBLISHER_PUBLISH_SESSION_SUCCESS,
  SOCKET_PUBLISHER_PUBLISH_SESSION,
  SOCKET_PUBLISHER_PUBLISH_USER_FAILURE,
  SOCKET_PUBLISHER_PUBLISH_USER_SUCCESS,
  SOCKET_PUBLISHER_PUBLISH_USER,
  SOCKET_PUBLISHER_RECEIVE_USER,
  SOCKET_PUBLISHER_SUBSCRIBE_ACTIONS_FAILURE,
  SOCKET_PUBLISHER_SUBSCRIBE_ACTIONS_SUCCESS,
  SOCKET_PUBLISHER_SUBSCRIBE_ACTIONS,
  SOCKET_PUBLISHER_SUBSCRIBE_USERS_FAILURE,
  SOCKET_PUBLISHER_SUBSCRIBE_USERS_SUCCESS,
  SOCKET_PUBLISHER_SUBSCRIBE_USERS,
  SOCKET_PUBLISHER_UNPUBLISH_SESSION_FAILURE,
  SOCKET_PUBLISHER_UNPUBLISH_SESSION_SUCCESS,
  SOCKET_PUBLISHER_UNPUBLISH_SESSION,
  SOCKET_PUBLISHER_RECEIVE_ACTION,
} from '../constants';

/**
 * @description Dispatch to start livestream session.
 */
export function socketPublisherPublishAction() {
  return {
    type: SOCKET_PUBLISHER_PUBLISH_ACTION,
  };
}

/**
 * @description Dispatched on start livestream session failure.
 */
export function socketPublisherPublishActionFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_PUBLISHER_PUBLISH_ACTION_FAILURE,
  };
}

/**
 * @description Dispatched on start livestream session success.
 * @param {Object} Object with params.
 * @param {string} params.sessionId
 * @param {timestamp} params.sessionTimestamp
 * @param {string} params.sessionToken
 * @param {string} params.sessionTopic
 * @param {username} params.username - Host username
 * @return {Object} Object with action type and payload.
 */
export function socketPublisherPublishActionSuccess({
  sessionId,
  sessionTimestamp,
  sessionToken,
  sessionTopic,
  sessionUsername,
}) {
  return {
    payload: {
      sessionId,
      sessionTimestamp,
      sessionToken,
      sessionTopic,
      sessionUsername,
    },
    type: SOCKET_PUBLISHER_PUBLISH_ACTION_SUCCESS,
  };
}
/**
 * @description Dispatch to start livestream session.
 */
export function socketPublisherPublishSession() {
  return {
    type: SOCKET_PUBLISHER_PUBLISH_SESSION,
  };
}

/**
 * @description Dispatched on start livestream session failure.
 */
export function socketPublisherPublishSessionFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_PUBLISHER_PUBLISH_SESSION_FAILURE,
  };
}

/**
 * @description Dispatched on start livestream session success.
 * @param {Object} Object with params.
 * @param {string} params.sessionId
 * @param {timestamp} params.sessionTimestamp
 * @param {string} params.sessionToken
 * @param {string} params.sessionTopic
 * @param {username} params.username - Host username
 * @return {Object} Object with action type and payload.
 */
export function socketPublisherPublishSessionSuccess({
  sessionId,
  sessionTimestamp,
  sessionToken,
  sessionTopic,
  sessionUsername,
}) {
  return {
    payload: {
      sessionId,
      sessionTimestamp,
      sessionToken,
      sessionTopic,
      sessionUsername,
    },
    type: SOCKET_PUBLISHER_PUBLISH_SESSION_SUCCESS,
  };
}

/**
 * @description Dispatch to publish user to session.
 */
export function socketPublisherPublishUser() {
  return {
    type: SOCKET_PUBLISHER_PUBLISH_USER,
  };
}

/**
 * @description Dispatch on publish user to session failure.
 */
export function socketPublisherPublishUserFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_PUBLISHER_PUBLISH_USER_FAILURE,
  };
}

/**
 * @description Dispatched on publish user to session success.
 * @param {Object} Object with params
 * @param {string} params.userId
 * @param {string} params.sessionId
 * @param {string} params.userToken
 * @param {username} params.username
 * @return {Object} Object with action type and payload.
 */
export function socketPublisherPublishUserSuccess({ userId, userToken }) {
  return {
    payload: { userId, userToken },
    type: SOCKET_PUBLISHER_PUBLISH_USER_SUCCESS,
  };
}

/**
 * @description Dispatched on receiving action in socket channel.
 * @param {Object} Object with params
 * @param {username} params.username
 * @return {Object} Object with action type and payload.
 */
export function socketPublisherReceiveAction({ type, payload }) {
  return {
    payload: { type, payload },
    type: SOCKET_PUBLISHER_RECEIVE_ACTION,
  };
}

/**
 * @description Dispatched when receiving user in socket channel.
 * @param {Object} Object with params
 * @param {username} params.username
 * @return {Object} Object with action type and payload.
 */
export function socketPublisherReceiveUser({ change, username }) {
  return {
    payload: { change, username },
    type: SOCKET_PUBLISHER_RECEIVE_USER,
  };
}

/**
 * @description Dispatch to end livestream session.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 * @param {number} params.sessionToken
 * @param {timestamp} params.username
 */
export function socketPublisherUnpublishSession({
  sessionId,
  sessionToken,
  username,
}) {
  return {
    payload: {
      sessionId,
      sessionToken,
      username,
    },
    type: SOCKET_PUBLISHER_UNPUBLISH_SESSION,
  };
}

/**
 * @description Dispatched on end livestream session failure.
 * @param {Object} Object with params
 * @param {string} params.error
 */
export function socketPublisherUnpublishSessionFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_PUBLISHER_UNPUBLISH_SESSION_FAILURE,
  };
}

/**
 * @description Dispatched on end livestream session success.
 */
export function socketPublisherUnpublishSessionSuccess() {
  return {
    type: SOCKET_PUBLISHER_UNPUBLISH_SESSION_SUCCESS,
  };
}

/**
 * @description Dispatch to subscribe to session actions.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketPublisherSubscribeActions({ sessionId }) {
  return {
    payload: { sessionId },
    type: SOCKET_PUBLISHER_SUBSCRIBE_ACTIONS,
  };
}

/**
 * @description Dispatch on subscribe to session actions failure.
 * @param {Object} Object with params
 * @param {string} params.error
 */
export function socketPublisherSubscribeActionsFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_PUBLISHER_SUBSCRIBE_ACTIONS_FAILURE,
  };
}

/**
 * @description Dispatch on subscribe to session actions success.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketPublisherSubscribeActionsSuccess() {
  return {
    type: SOCKET_PUBLISHER_SUBSCRIBE_ACTIONS_SUCCESS,
  };
}

/**
 * @description Dispatch to subscribe to session users.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketPublisherSubscribeUsers({ sessionId }) {
  return {
    payload: { sessionId },
    type: SOCKET_PUBLISHER_SUBSCRIBE_USERS,
  };
}

/**
 * @description Dispatched on subscribe to session users failure.
 * @param {Object} Object with params
 * @param {string} params.error
 */
export function socketPublisherSubscribeUsersFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_PUBLISHER_SUBSCRIBE_USERS_FAILURE,
  };
}

/**
 * @description Dispatched on subscribe to session users success.
 */
export function socketPublisherSubscribeUsersSuccess() {
  return {
    type: SOCKET_PUBLISHER_SUBSCRIBE_USERS_SUCCESS,
  };
}
