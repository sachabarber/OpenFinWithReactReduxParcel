import { ActionWrapper } from '../utils/redux-with-class/actionwrapper';
import { BlotterInfo } from '../common/commonModels';

export interface BlotterInfoState {
    blotterInfos: BlotterInfo[];
    blotterLoadingError: boolean;
}

const initialState: BlotterInfoState = {
    blotterInfos: BlotterInfo[0],
    blotterLoadingError: false

};

function fetchBlotterInfos() {
    return fetch('/blotterInfos').then(x => {
        return x.json();
    });
}

export function fetchBlotterFromEndpoint() {

    return function (dispatch) {
        return fetchBlotterInfos()
            .then(
                jsonBlotters => dispatch(new BlotterLoadedAction(jsonBlotters)),
                reason => dispatch(new BlotterLoadingErrorAction()
            ));
    };
}

export function blotterReducer(state: BlotterInfoState = initialState, wrapper: ActionWrapper) {
    const action = wrapper.action;

    if (action instanceof BlotterLoadedAction) {
        return {
            ...state,
            blotterInfos: action.blotterInfos,
            blotterLoadingError: false
        }
    }

    if (action instanceof BlotterLoadingErrorAction) {
        return {
            ...state,
            blotterInfos: new Array<BlotterInfo>(),
            blotterLoadingError: true
        };
    }

    return state;
}

class BlotterLoadedAction {
    type = 'My-App/Blotter-Infos-Loaded';

    constructor(public blotterInfos: BlotterInfo[]) {

    }
}

class BlotterLoadingErrorAction {
    type = 'My-App/Blotter-Infos-Loading-Error';

    constructor() {

    }
}