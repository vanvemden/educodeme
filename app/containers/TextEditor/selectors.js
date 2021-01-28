import { createSelector } from 'reselect';

import { textEditorInitialState } from './reducer';

/**
 * Direct selector to the TextEditor state domain
 */
const selectTextEditorDomain = state =>
  state.containers.textEditor || textEditorInitialState;

/**
 * Memoized selectors
 */

const makeSelectTextEditor = () =>
  createSelector(
    selectTextEditorDomain,
    textEditorState => textEditorState,
  );

export { selectTextEditorDomain, makeSelectTextEditor };
