import {
  TEXT_EDITOR_ON_CHANGE,
  TEXT_EDITOR_RESET,
  TEXT_EDITOR_START,
  TEXT_EDITOR_STOP,
} from './constants';

export function textEditorOnChange({ value }) {
  return {
    payload: { value },
    type: TEXT_EDITOR_ON_CHANGE,
  };
}

export function textEditorReset() {
  return {
    type: TEXT_EDITOR_RESET,
  };
}

export function textEditorStart() {
  return {
    type: TEXT_EDITOR_START,
  };
}

export function textEditorStop() {
  return {
    type: TEXT_EDITOR_STOP,
  };
}
