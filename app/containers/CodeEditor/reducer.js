import produce from 'immer';

import { CODE_EDITOR_RESET } from './constants';

export const codeEditorInitialState = {
  hasErrors: false,
  isLoading: false,
  value: 'CODE GOES HERE',
};

/* eslint-disable default-case, no-param-reassign */
const codeEditorReducer = (state = codeEditorInitialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CODE_EDITOR_RESET:
        draft.value = 'YOU CLICKED THE RESET BUTTON';
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
