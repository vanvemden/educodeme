import {
  SOCKET_SUBSCRIBER_PUBLISH_USER_FAILURE,
  SOCKET_SUBSCRIBER_PUBLISH_USER_SUCCESS,
  SOCKET_SUBSCRIBER_PUBLISH_USER,
  SOCKET_SUBSCRIBER_RECEIVE_SESSION,
  SOCKET_SUBSCRIBER_RECEIVE_USER,
  SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS_FAILURE,
  SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS_SUCCESS,
  SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_FAILURE,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS,
  SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION,
  SOCKET_SUBSCRIBER_SUBSCRIBE_USERS_FAILURE,
  SOCKET_SUBSCRIBER_SUBSCRIBE_USERS_SUCCESS,
  SOCKET_SUBSCRIBER_SUBSCRIBE_USERS,
  SOCKET_SUBSCRIBER_UNPUBLISH_USER_FAILURE,
  SOCKET_SUBSCRIBER_UNPUBLISH_USER_SUCCESS,
  SOCKET_SUBSCRIBER_UNPUBLISH_USER,
  SOCKET_SUBSCRIBER_UNSUBSCRIBE_ACTIONS_FAILURE,
  SOCKET_SUBSCRIBER_UNSUBSCRIBE_ACTIONS_SUCCESS,
  SOCKET_SUBSCRIBER_UNSUBSCRIBE_ACTIONS,
  SOCKET_SUBSCRIBER_UNSUBSCRIBE_USERS_FAILURE,
  SOCKET_SUBSCRIBER_UNSUBSCRIBE_USERS_SUCCESS,
  SOCKET_SUBSCRIBER_UNSUBSCRIBE_USERS,
} from '../constants';

/**
 * @description Dispatch to publish user to session.
 */
export function socketSubscriberPublishUser() {
  return {
    type: SOCKET_SUBSCRIBER_PUBLISH_USER,
  };
}

/**
 * @description Dispatch on publish user to session failure.
 */
export function socketSubscriberPublishUserFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_SUBSCRIBER_PUBLISH_USER_FAILURE,
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
export function socketSubscriberPublishUserSuccess({ userId, userToken }) {
  return {
    payload: { userId, userToken },
    type: SOCKET_SUBSCRIBER_PUBLISH_USER_SUCCESS,
  };
}

/**
 * @description Dispatched on channel receiving session data.
 * @param {Object} Object with params
 * @param {string} params.isLivestream
 * @param {string} params.sessionTopic
 * @return {Object} Object with action type and payload.
 */
export function socketSubscriberReceiveSession({
  sessionIsLivestream,
  sessionTopic,
}) {
  return {
    payload: { sessionIsLivestream, sessionTopic },
    type: SOCKET_SUBSCRIBER_RECEIVE_SESSION,
  };
}

/**
 * @description Dispatched on channel receiving session data.
 * @param {Object} Object with params
 * @param {string} params.isLivestream
 * @param {string} params.sessionTopic
 * @return {Object} Object with action type and payload.
 */
export function socketSubscriberReceiveUser({ change, username }) {
  return {
    payload: { change, username },
    type: SOCKET_SUBSCRIBER_RECEIVE_USER,
  };
}

/**
 * @description Dispatch to subscribe to session actions.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketSubscriberSubscribeActions({ sessionId }) {
  return {
    payload: { sessionId },
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS,
  };
}

/**
 * @description Dispatch on subscribe to session actions failure.
 * @param {Object} Object with params
 * @param {string} params.error
 */
export function socketSubscriberSubscribeActionsFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS_FAILURE,
  };
}

/**
 * @description Dispatch on subscribe to session actions success.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketSubscriberSubscribeActionsSuccess() {
  return {
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_ACTIONS_SUCCESS,
  };
}

/**
 * @description Dispatched to subscribe to livestream session.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketSubscriberSubscribeSession({ sessionId }) {
  return {
    payload: { sessionId },
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION,
  };
}

/**
 * @description Dispatched on subscribe to livestream session failure.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketSubscriberSubscribeSessionFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_FAILURE,
  };
}

/**
 * @description Dispatched on subscribe to livestream session success.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketSubscriberSubscribeSessionSuccess({
  sessionId,
  sessionIsLivestream,
  sessionTimestamp,
  sessionTopic,
  sessionUsername,
}) {
  return {
    payload: {
      sessionId,
      sessionIsLivestream,
      sessionTimestamp,
      sessionTopic,
      sessionUsername,
    },
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS,
  };
}

/**
 * @description Dispatch to subscribe to session users.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketSubscriberSubscribeUsers({ sessionId }) {
  return {
    payload: { sessionId },
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_USERS,
  };
}

/**
 * @description Dispatched on subscribe to session users failure.
 * @param {Object} Object with params
 * @param {string} params.error
 */
export function socketSubscriberSubscribeUsersFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_USERS_FAILURE,
  };
}

/**
 * @description Dispatched on subscribe to session users success.
 */
export function socketSubscriberSubscribeUsersSuccess() {
  return {
    type: SOCKET_SUBSCRIBER_SUBSCRIBE_USERS_SUCCESS,
  };
}

/**
 * @description Dispatched to unpublish user from session.
 * @param {Object} Object with params
 * @param {string} params.sessionId
 */
export function socketSubscriberUnpublishUser() {
  return {
    type: SOCKET_SUBSCRIBER_UNPUBLISH_USER,
  };
}

/**
 * @description Dispatched on unpublish user from session failure.
 * @param {Object} Object with params
 * @param {string} params.error
 */
export function socketSubscriberUnpublishUserFailure({ error }) {
  return {
    payload: { error },
    type: SOCKET_SUBSCRIBER_UNPUBLISH_USER_FAILURE,
  };
}

/**
 * @description Dispatched on unpublish from session success.
 */
export function socketSubscriberUnpublishUserSuccess() {
  return {
    type: SOCKET_SUBSCRIBER_UNPUBLISH_USER_SUCCESS,
  };
}

/**
 * @description Dispatched to unsubscribe from session actions.
 */
export function socketSubscriberUnsubscribeActions() {
  return {
    type: SOCKET_SUBSCRIBER_UNSUBSCRIBE_ACTIONS,
  };
}

/**
 * @description Dispatched on unsubscribe from session actions failure.
 */
export function socketSubscriberUnsubscribeActionsFailure() {
  return {
    type: SOCKET_SUBSCRIBER_UNSUBSCRIBE_ACTIONS_FAILURE,
  };
}

/**
 * @description Dispatched on unsubscribe from session actions success.
 */
export function socketSubscriberUnsubscribeActionsSuccess() {
  return {
    type: SOCKET_SUBSCRIBER_UNSUBSCRIBE_ACTIONS_SUCCESS,
  };
}

/**
 * @description Dispatched to unsubscribe from session users.
 */
export function socketSubscriberUnsubscribeUsers() {
  return {
    type: SOCKET_SUBSCRIBER_UNSUBSCRIBE_USERS,
  };
}

/**
 * @description Dispatched on unsubscribe from session failure.
 */
export function socketSubscriberUnsubscribeUsersFailure() {
  return {
    type: SOCKET_SUBSCRIBER_UNSUBSCRIBE_USERS_FAILURE,
  };
}

/**
 * @description Dispatched on unsubscribe from session success.
 */
export function socketSubscriberUnsubscribeUsersSuccess() {
  return {
    type: SOCKET_SUBSCRIBER_UNSUBSCRIBE_USERS_SUCCESS,
  };
}
