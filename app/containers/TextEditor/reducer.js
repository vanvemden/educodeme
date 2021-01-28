import produce from 'immer';

import { TEXT_EDITOR_ON_CHANGE } from './constants';

export const textEditorInitialState = {
  automaticLayout: true,
  hasErrors: false,
  height: '200px',
  isHosting: true,
  isLoading: false,
  language: 'plaintext',
  options: {
    cursorStyle: '',
    fontSize: '15px',
    lineNumbers: 'off',
    readOnly: false,
    minimap: {
      enabled: false,
    },
  },
  theme: 'vs-light',
  value: '/** Text Editor **/',
  width: '100%',
};

/* eslint-disable default-case, no-param-reassign */
const textEditorReducer = (state = textEditorInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TEXT_EDITOR_ON_CHANGE:
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

export default textEditorReducer;
