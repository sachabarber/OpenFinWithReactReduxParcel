import { ActionWrapper } from '../utils/redux-with-class/actionwrapper';
import { BlotterInfo } from '../common/commonModels';

export interface BlotterInfoState {
    blotterInfos: BlotterInfo[];
}

const initialState: BlotterInfoState = {
    blotterInfos: BlotterInfo[0],
};

function fetchBlotterInfos() {
    return fetch('/blotterInfos').then(x => {
        return x.json();
    });
}

export function fetchBlotterFromEndpoint() {

    return function (dispatch) {
        return fetchBlotterInfos().then(
            jsonBlotters => dispatch(new BlotterLoadedAction(jsonBlotters))
        );
    };
}

export function blotterReducer(state: BlotterInfoState = initialState, wrapper: ActionWrapper) {
  const action = wrapper.action;
  if (action instanceof BlotterLoadedAction) {
    return {
      ...state,
      blotterInfos: action.blotterInfos
    };
  }
  return state;
}

class BlotterLoadedAction {
    type = 'My-App/Blotter-Infos-Loaded';

    constructor(public blotterInfos: BlotterInfo[]) {

    }
}