import { createSelector } from 'reselect';

import { codeEditorInitialState } from './reducer';

/**
 * Direct selector to the CodeEditor state domain
 */
const selectCodeEditorDomain = state =>
  state.codeEditor || codeEditorInitialState;

/**
 * Memoized selectors
 */

const makeSelectCodeEditor = () =>
  createSelector(
    selectCodeEditorDomain,
    codeEditorState => codeEditorState,
  );

const makeSelectCodeEditorValueOfKey = key =>
  createSelector(
    selectCodeEditorDomain,
    codeEditorState => codeEditorState[key],
  );

export {
  makeSelectCodeEditor,
  makeSelectCodeEditorValueOfKey,
  selectCodeEditorDomain,
};
