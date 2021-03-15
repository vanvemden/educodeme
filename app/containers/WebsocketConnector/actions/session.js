import {
  SOCKET_SESSION_USERNAME_ONCHANGE,
  SOCKET_SESSION_TOPIC_ONCHANGE,
} from '../constants';

/**
 * @description Dispatched on sessionTopic input field change.
 * @param {Object} Object with params
 * @param {string} params.value
 */
export function socketSessionTopicOnChange({ value }) {
  return {
    payload: { value },
    type: SOCKET_SESSION_TOPIC_ONCHANGE,
  };
}

/**
 * @description Dispatched on username input field change.
 * @param {Object} Object with params
 * @param {string} params.value
 */
export function socketSessionUsernameOnChange({ value }) {
  return {
    payload: { value },
    type: SOCKET_SESSION_USERNAME_ONCHANGE,
  };
}
