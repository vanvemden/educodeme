import { createSelector } from 'reselect';

import { textEditorInitialState } from './reducer';

/**
 * Direct selector to the TextEditor state domain
 */
const selectTextEditorDomain = state =>
  state.textEditor || textEditorInitialState;

/**
 * Memoized selectors
 */

const makeSelectTextEditor = () =>
  createSelector(
    selectTextEditorDomain,
    textEditorState => textEditorState,
  );

const makeSelectTextEditorValueOfKey = key =>
  createSelector(
    selectTextEditorDomain,
    codeEditorState => codeEditorState[key],
  );

export {
  makeSelectTextEditor,
  makeSelectTextEditorValueOfKey,
  selectTextEditorDomain,
};
