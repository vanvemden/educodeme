import produce from 'immer';

import {
  CODE_EDITOR_ON_CHANGE_FROM_WEBSOCKET,
  CODE_EDITOR_ON_CHANGE_PUBLISH_FAILURE,
  CODE_EDITOR_ON_CHANGE_PUBLISH_SUCCESS,
  CODE_EDITOR_ON_CHANGE,
} from './constants';

export const codeEditorInitialState = {
  automaticLayout: true,
  hasErrors: false,
  height: '200px',
  isHost: true,
  isLoading: false,
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
        draft.isSending = draft.isHost;
        break;
      case CODE_EDITOR_ON_CHANGE_FROM_WEBSOCKET:
        draft.value = action.payload.value;
        break;
      case CODE_EDITOR_ON_CHANGE_PUBLISH_FAILURE:
        draft.isSending = false;
        break;
      case CODE_EDITOR_ON_CHANGE_PUBLISH_SUCCESS:
        draft.isSending = false;
        break;
    }
  });

export default codeEditorReducer;
