import {
  CODE_EDITOR_RESET,
  CODE_EDITOR_RESET_FAILURE,
  CODE_EDITOR_RESET_SUCCESS,
} from './constants';

export function codeEditorReset() {
  return {
    payload: {},
    type: CODE_EDITOR_RESET,
  };
}

export function codeEditorResetFailure({ errors }) {
  return {
    payload: { errors },
    type: CODE_EDITOR_RESET_FAILURE,
  };
}

export function codeEditorResetSuccess() {
  return {
    payload: {},
    type: CODE_EDITOR_RESET_SUCCESS,
  };
}
