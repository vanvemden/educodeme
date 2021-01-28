import produce from 'immer';

import {
  CODE_EDITOR_ON_CHANGE,
  CODE_EDITOR_ON_CHANGE_FROM_WEBSOCKET,
} from './constants';

export const codeEditorInitialState = {
  automaticLayout: true,
  hasErrors: false,
  height: '200px',
  isHosting: true,
  isLoading: false,
  language: 'javascript',
  options: {
    cursorStyle: 'block',
    fontSize: '15px',
    lineNumbers: 'on',
    readOnly: false,
    minimap: {
      enabled: false,
    },
  },
  theme: 'vs-dark',
  value: '/** Code Editor **/',
};

/* eslint-disable default-case, no-param-reassign */
const codeEditorReducer = (state = codeEditorInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CODE_EDITOR_ON_CHANGE:
        draft.value = action.payload.value;
        break;
      case CODE_EDITOR_ON_CHANGE_FROM_WEBSOCKET:
        draft.value = action.payload.value;
        break;

      default:
        // //   'app/containers/CodeEditor/components/StartButton/ASYNC';
        // console.log(action.type);
        // const [
        //   app,
        //   parentType,
        //   parent,
        //   childType,
        //   child,
        //   ...actionType
        // ] = action.type.split('/');
        // console.log(
        //   'The action.type value split:',
        //   app,
        //   parentType,
        //   parent,
        //   childType,
        //   child,
        //   actionType,
        // );
        // console.log('From draft:', draft[parentType][parent]);
        // // switch (action) {
        // //   case 'ASYNC':
        // //     // Check if the object
        // //     break;
        // // }
        break;
    }
  });

export default codeEditorReducer;
