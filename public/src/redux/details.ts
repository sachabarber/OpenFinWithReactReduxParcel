import { ActionWrapper } from '../utils/redux-with-class/actionwrapper';

export interface DetailState {
  counter: number;
}

const initialState: DetailState = {
  counter: 0,
};

export function detailsReducer(state: DetailState = initialState, wrapper: ActionWrapper) {
  const action = wrapper.action;
  if (action instanceof IncrementCounterAction) {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  return state;
}

class IncrementCounterAction {
  type = 'My-App/Increment-Counter';
}

export function incrementCounter() {
  return new IncrementCounterAction();
}
