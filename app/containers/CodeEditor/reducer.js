import produce from 'immer';

import {
  CODE_EDITOR_ON_CHANGE_FROM_SOCKET,
  CODE_EDITOR_ON_CHANGE_PUBLISH_FAILURE,
  CODE_EDITOR_ON_CHANGE_PUBLISH_SUCCESS,
  CODE_EDITOR_ON_CHANGE,
} from './constants';

import { SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS } from '../WebsocketConnector/constants';

export const codeEditorInitialState = {
  automaticLayout: true,
  hasError: false,
  height: '200px',
  isLoading: false,
  isReceiving: false,
  isSending: false,
  language: 'javascript',
  options: {
    cursorStyle: 'block',
    fontSize: '15px',
    lineNumbers: 'on',
    readOnly: false,
    minimap: {
      enabled: false,
    },
  },
  theme: 'vs-dark',
  value: '',
  width: '100%',
};

/* eslint-disable default-case, no-param-reassign */
const codeEditorReducer = (state = codeEditorInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CODE_EDITOR_ON_CHANGE:
        draft.value = action.payload.value;
        draft.isSending = true;
        break;
      case CODE_EDITOR_ON_CHANGE_FROM_SOCKET:
        draft.value = action.payload.value;
        draft.isReceiving = !draft.isReceiving;
        break;
      case CODE_EDITOR_ON_CHANGE_PUBLISH_FAILURE:
        draft.hasError = true;
        draft.isSending = false;
        break;
      case CODE_EDITOR_ON_CHANGE_PUBLISH_SUCCESS:
        draft.hasError = false;
        draft.isSending = false;
        break;
      case SOCKET_SUBSCRIBER_SUBSCRIBE_SESSION_SUCCESS:
        draft.options.readOnly = true;
        break;
    }
  });

export default codeEditorReducer;
