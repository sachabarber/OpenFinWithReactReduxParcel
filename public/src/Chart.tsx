import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Layouts from "openfin-layouts"

//scss
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../scss/index.scss';
import 'react-table/react-table.css'

//components
import dockGrayLogo from '../img/dock16Gray.png';
import dockWhiteLogo from '../img/dock16White.png';
import dockAllGrayLogo from '../img/dock16AllGray.png';
import dockAllWhiteLogo from '../img/dock16AllWhite.png';
import HoverImage from "react-hover-image"

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


interface ChartProps {
    chartData: any;
    chartLoadingError: boolean;
}

interface  ChartActions {
    fetchChartDataFromWeb: any;
}


interface ChartState {
    chartData: any;
    pair: string;
}

export class ChartInner extends React.Component<ChartProps & ChartActions, ChartState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            (typeof this.state === "undefined" || this.state === null
                || typeof this.state.chartData === "undefined" || this.state.chartData === null)
                ? <div className="Loader">
                    <div className="LoaderImage">
                        <span>
                            <img src={loaderLogo} />
                            <br />
                            <span className="Text">Loading</span>
                        </span>
                    </div>
                </div>
                :
                <div>
                    <div>
                        <span>
                        <HoverImage className="unDockButton"
                            src={dockGrayLogo}
                            hoverSrc={dockWhiteLogo}
                            onClick={this.handleUndockClick} />
                        </span>
                        &nbsp;&nbsp;
                        <span>
                        <HoverImage className="unDockallButton"
                            src={dockAllGrayLogo}
                            hoverSrc={dockAllWhiteLogo}
                            onClick={this.handleUndockAllClick} />
                        </span>
                    </div>
                    <div className="chartContainer">
                        <FixedWidthChart data={this.state.chartData} pair={this.state.pair} />
                    </div>
                </div>
        );
    }

    initInterApp = () => {
        self = this;

        fin.desktop.InterApplicationBus.subscribe("*", "view-chart-for-pair",
            function (message, uuid) {
                window.location.assign("/chart?pair=" + message.pair);
                document.title = window.location.hostname + ':' + window.location.port + "/chart?pair=" + message.pair;
            });
    };

    componentDidMount = () => {

        this.initInterApp();
        const searchParams = new URLSearchParams(location.search);
        var reqPair = searchParams.get('pair') || 'BTCEUR'
        console.log("Query string pair", reqPair);
        this.setState({ pair:reqPair });
        this.props.fetchChartDataFromWeb(reqPair);
    }

    //static getDerivedStateFromProps(nextProps, prevState) {
    //
    //}

    //componentDidUpdate(prevProps, prevState) {
    //
    //}

    //NOTE : This method will be deprecated in near future should use above methods
    componentWillReceiveProps = (nextProps) => {
        console.log("props data", nextProps.chartData);
        var wasChartLoadingError = nextProps.chartLoadingError;
        if (wasChartLoadingError) {
            alert("Could not load chart data");
            return;
        }
        //NOTE :Dont know why I have to use sta ebyt react-stockcharts doesnt like using the react state
        //transferred to props at all. Hey ho though
        if (nextProps.chartData != null) {
            this.setState({ chartData: nextProps.chartData });
        }
    }

    handleUndockClick = () => {
        Layouts.snapAndDock.undockWindow();
    }

    handleUndockAllClick = () => {
        Layouts.snapAndDock.undockGroup();
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

