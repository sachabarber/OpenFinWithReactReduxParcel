import * as React from 'react';
import * as ReactDOM from 'react-dom';


//scss
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../scss/index.scss';
import 'react-table/react-table.css'


//Redux
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { RootState } from './redux/root';
import { connect } from 'react-redux';
import { fetchChartDataFromWeb } from './redux/chart';

//images
import loaderLogo from '../img/ajax-loader.gif';

//chart
import { FixedWidthChart } from './CryptoChart';

import { getData } from "./utils/ChartUtils"

////chart
//interface CryptoChartProps {
//    data: any;
//}

//class CryptoChart extends React.Component<CryptoChartProps, undefined> {
//    constructor(props: any) {
//        super(props);
//    }

//    render() {
//        //TODO : See https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChartWithHoverTooltip
//        //TODO : See https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChartWithHoverTooltip
//        //TODO : See https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChartWithHoverTooltip
//        //TODO : See https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChartWithHoverTooltip
//        //TODO : See https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChartWithHoverTooltip
//        //TODO : See https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/CandleStickChartWithHoverTooltip

//        //good CSV data here when needed : https://www.cryptodatadownload.com/
//        //good CSV data here when needed : https://www.cryptodatadownload.com/
//        //good CSV data here when needed : https://www.cryptodatadownload.com/
//        //good CSV data here when needed : https://www.cryptodatadownload.com/



//        return <div>
//            <h1>THE CHART IS LOADED</h1>
//            <h2>{this.props.data.length}</h2>
//        </div>
//    }
//}




interface ChartProps {
    chartData: any;
    chartLoadingError: boolean;
}

interface  ChartActions {
    fetchChartDataFromWeb: any;
}


interface ChartState {
    data: any;
}

//export class ChartInner extends React.Component<ChartProps & ChartActions, undefined> {
export class ChartInner extends React.Component<undefined, ChartState> {
    constructor(props: any) {
        super(props);
    }

    render() {

        if (this.state == null) {
            return <div>Loading...</div>
        }


        return (
            //(typeof this.props === "undefined" || this.props === null
            //    || typeof this.props.chartData === "undefined" || this.props.chartData === null)
            //    ? <div className="Loader">
            //        <div className="LoaderImage">
            //            <span>
            //                <img src={loaderLogo} />
            //                <br />
            //                <span className="Text">Loading</span>
            //            </span>
            //        </div>
            //    </div>
            //    :
                <FixedWidthChart data={this.state.data} />
                //<CryptoChart data={this.props.chartData} />
        );
    }

    componentDidMount = () => {
        //this.props.fetchChartDataFromWeb();

            getData().then(data => {
                this.setState({ data })
            })
    }

    //static getDerivedStateFromProps(nextProps, prevState) {
    //
    //}

    //componentDidUpdate(prevProps, prevState) {
    //
    //}

    //NOTE : This method will be deprecated in near future should use above methods
    componentWillReceiveProps = (nextProps) => {
        var wasChartLoadingError = nextProps.chartLoadingError;
        if (wasChartLoadingError) {
            alert("Could not load chart data");
        }
    }
}

export const TheChart = connect<ChartProps, ChartActions, RootState>(
    state => ({
        chartData: state.chart.chartData,
        chartLoadingError: state.chart.chartLoadingError
    }),
    {
        fetchChartDataFromWeb: fetchChartDataFromWeb
    }
)(ChartInner);


export const ChartComponent = () => (
    <Provider store={store}>
        <TheChart />
    </Provider>
);

