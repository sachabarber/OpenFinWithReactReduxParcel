import { ActionWrapper } from '../utils/redux-with-class/actionwrapper';
import { parseData, parseDate } from '../utils/ChartUtils';
import { tsvParse, csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";


export interface ChartInfoState {
    chartData: any;
    chartLoadingError: boolean;
}

const initialState: ChartInfoState = {
    chartData: [],
    chartLoadingError: false
};


function fetchChartData() {
    return fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)));
}



export function fetchChartDataFromWeb() {

    return function (dispatch) {
        return fetchChartData()
            .then(
                data => dispatch(new ChartLoadedAction(data)),
                reason => dispatch(new ChartLoadingErrorAction()
            ));
    };
}

export function chartReducer(state: ChartInfoState = initialState, wrapper: ActionWrapper) {
  const action = wrapper.action;

  if (action instanceof ChartLoadedAction) {
      return {
          ...state,
          chartData: action.chartData,
          chartLoadingError: false
      }
  }

  if (action instanceof ChartLoadingErrorAction) {
    return {
        ...state,
        chartData: [],
        chartLoadingError: true
    };
  }

  return state;
}

class ChartLoadedAction {
    type = 'My-App/Chart-Infos-Loaded';

    constructor(public chartData: any) {

    }
}


class ChartLoadingErrorAction {
    type = 'My-App/Chart-Infos-Loading-Error';

    constructor() {

    }
}