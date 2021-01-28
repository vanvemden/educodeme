/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import codeEditorReducer from 'containers/CodeEditor/reducer';
import textEditorReducer from 'containers/TextEditor/reducer';

const containers = combineReducers({
  codeEditor: codeEditorReducer,
  languageProvider: languageProviderReducer,
  textEditor: textEditorReducer,
});

/**
 * Merges root level reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    containers,
    router: connectRouter(history),
  });

  return rootReducer;
}
