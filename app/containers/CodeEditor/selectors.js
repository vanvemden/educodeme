import { createSelector } from 'reselect';

import { codeEditorInitialState } from './reducer';

/**
 * Direct selector to the CodeEditor state domain
 */
const selectCodeEditorDomain = state =>
  state.containers.codeEditor || codeEditorInitialState;

/**
 * Memoized selectors
 */

const makeSelectCodeEditor = () =>
  createSelector(
    selectCodeEditorDomain,
    codeEditorState => codeEditorState,
  );

export { selectCodeEditorDomain, makeSelectCodeEditor };
