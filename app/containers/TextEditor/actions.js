import { TEXT_EDITOR_ON_CHANGE } from './constants';

export function textEditorOnChange({ value }) {
  return {
    payload: { value },
    type: TEXT_EDITOR_ON_CHANGE,
  };
}
