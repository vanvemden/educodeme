import {
  CODE_EDITOR_RESET,
  CODE_EDITOR_START,
  CODE_EDITOR_STOP,
} from './constants';

export function codeEditorReset() {
  return {
    type: CODE_EDITOR_RESET,
  };
}

export function codeEditorStart() {
  return {
    type: CODE_EDITOR_START,
  };
}

export function codeEditorStop() {
  return {
    type: CODE_EDITOR_STOP,
  };
}
