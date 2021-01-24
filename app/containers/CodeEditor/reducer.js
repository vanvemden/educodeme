import produce from 'immer';

import { CODE_EDITOR_RESET } from './constants';

export const codeEditorInitialState = {
  isLoading: false,
  hasErrors: false,
};

/* eslint-disable default-case, no-param-reassign */
const codeEditorReducer = (state = codeEditorInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CODE_EDITOR_RESET:
        draft.isLoading = true;
        break;
      default:
        // action type string matching for default SUCCES/FAILURE
        // handling goes here
        break;
    }
  });

export default codeEditorReducer;
