import { ActionWrapper } from '../utils/redux-with-class/actionwrapper';
import { TileInfo } from '../common/commonModels';

export interface TilesInfoState {
    tileInfos: TileInfo[];
}

const initialState: TilesInfoState = {
    tileInfos: TileInfo[0],
};

function fetchTileInfos() {
    return fetch('/tileInfos').then(x => {
        return x.json();
    });
}


export function fetchTilesFromEndpoint() {

    return function (dispatch) {
        return fetchTileInfos().then(
            jsonTiles => dispatch(new TileLoadedAction(jsonTiles))
        );
    };
}


export function tilesReducer(state: TilesInfoState = initialState, wrapper: ActionWrapper) {
  const action = wrapper.action;
    if (action instanceof TileLoadedAction) {
    return {
      ...state,
        tileInfos: action.tileInfos
    };
  }
  return state;
}

class TileLoadedAction {
    type = 'My-App/Tile-Infos-Loaded';

    constructor(public tileInfos: TileInfo[]) {

    }
}