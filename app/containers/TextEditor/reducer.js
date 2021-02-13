import produce from 'immer';

import {
  TEXT_EDITOR_ON_CHANGE_FROM_WEBSOCKET,
  TEXT_EDITOR_ON_CHANGE_PUBLISH_FAILURE,
  TEXT_EDITOR_ON_CHANGE_PUBLISH_SUCCESS,
  TEXT_EDITOR_ON_CHANGE,
} from './constants';

import {
  WEBSOCKET_CONNECTOR_ACTION_RECEIVED,
  WEBSOCKET_CONNECTOR_PUBLISH_SESSION_SUCCESS,
  WEBSOCKET_CONNECTOR_SUBSCRIBE_TO_SESSION,
} from '../WebsocketConnector/constants';

export const textEditorInitialState = {
  automaticLayout: true,
  hasError: false,
  height: '200px',
  isLoading: false,
  isReceiving: false,
  isSending: false,
  language: 'plaintext',
  options: {
    cursorStyle: '',
    fontSize: '15px',
    lineNumbers: 'off',
    readOnly: false,
    minimap: {
      enabled: false,
    },
  },
  theme: 'vs-light',
  value: '',
  width: '100%',
};

/* eslint-disable default-case, no-param-reassign */
const textEditorReducer = (state = textEditorInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TEXT_EDITOR_ON_CHANGE:
        draft.value = action.payload.value;
        draft.isSending = true;
        break;
      case TEXT_EDITOR_ON_CHANGE_FROM_WEBSOCKET:
        draft.value = action.payload.value;
        draft.isReceiving = !draft.isReceiving;
        break;
      case TEXT_EDITOR_ON_CHANGE_PUBLISH_FAILURE:
        draft.hasError = true;
        draft.isSending = false;
        break;
      case TEXT_EDITOR_ON_CHANGE_PUBLISH_SUCCESS:
        draft.hasError = false;
        draft.isSending = false;
        break;
      case WEBSOCKET_CONNECTOR_ACTION_RECEIVED:
        break;
    }
  });

export default textEditorReducer;
