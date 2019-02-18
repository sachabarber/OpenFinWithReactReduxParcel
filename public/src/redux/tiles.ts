import { ActionWrapper } from '../utils/redux-with-class/actionwrapper';
import { TileInfo } from '../common/commonModels';

export interface TilesInfoState {
    tileInfos: TileInfo[];
}

const initialState: TilesInfoState = {
    tileInfos: TileInfo[0],
};

export function tilesReducer(state: TilesInfoState = initialState, wrapper: ActionWrapper) {
  const action = wrapper.action;
  if (action instanceof FetchTileInfosAction) {
    return {
      ...state,
      tileInfos:
        [
            new TileInfo("USDGBP", 0.78),
            new TileInfo("USDEUR", 0.89),
            new TileInfo("USDCAN", 1.32),
            new TileInfo("USDCHF", 1.01),
            new TileInfo("GBPCAN", 1.71),
            new TileInfo("GBPAUD", 1.81),
            new TileInfo("GBPEUR", 1.14),
            new TileInfo("GBPPLN", 4.95)
        ]
    };
  }
  return state;
}

class FetchTileInfosAction {
  type = 'My-App/Fetch-Tile-Infos';
}

export function fetchTileInfos() {
    return new FetchTileInfosAction();
}