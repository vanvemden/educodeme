import { CODE_EDITOR_ON_CHANGE } from './constants';

export function codeEditorOnChange({ value }) {
  return {
    payload: { value },
    type: CODE_EDITOR_ON_CHANGE,
  };
}
