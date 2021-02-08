import produce from 'immer';

import {
  TEXT_EDITOR_ON_CHANGE_FROM_WEBSOCKET,
  TEXT_EDITOR_ON_CHANGE_PUBLISH_FAILURE,
  TEXT_EDITOR_ON_CHANGE_PUBLISH_SUCCESS,
  TEXT_EDITOR_ON_CHANGE,
} from './constants';

export const textEditorInitialState = {
  automaticLayout: true,
  hasErrors: false,
  height: '200px',
  isHost: true,
  isLoading: false,
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
        draft.isSending = draft.isHost;
        break;
      case TEXT_EDITOR_ON_CHANGE_FROM_WEBSOCKET:
        draft.value = action.payload.value;
        break;
      case TEXT_EDITOR_ON_CHANGE_PUBLISH_FAILURE:
        draft.isSending = false;
        break;
      case TEXT_EDITOR_ON_CHANGE_PUBLISH_SUCCESS:
        draft.isSending = false;
        break;
    }
  });

export default textEditorReducer;
