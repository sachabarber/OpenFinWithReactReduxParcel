import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactTable from "react-table";
import * as Layouts from "openfin-layouts"


//scss
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../scss/index.scss';
import 'react-table/react-table.css'

//components
import { Button } from 'react-bootstrap';
import HoverImage from "react-hover-image"
import { BlotterInfo } from './common/commonModels';
import { showChartWindow } from "./utils/ChartUtils"
import dockGrayLogo from '../img/dock16Gray.png';
import dockWhiteLogo from '../img/dock16White.png';
import dockAllGrayLogo from '../img/dock16AllGray.png';
import dockAllWhiteLogo from '../img/dock16AllWhite.png';

//Redux
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { RootState } from './redux/root';
import { connect } from 'react-redux';
import { fetchBlotterFromEndpoint } from './redux/blotter';


//images
import loaderLogo from '../img/ajax-loader.gif';

interface BlotterProps {
    blotterInfos: BlotterInfo[];
    blotterLoadingError: Boolean
}

interface BlotterActions {
    fetchBlotterFromEndpoint: any;
}

interface BlotterState {
    selectedRow: number;
}

class BlotterInner extends React.Component<BlotterProps & BlotterActions, BlotterState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const columns = [
            {
                
                Header: () => (
                    <div
                        style={{
                            textAlign: "left"
                        }}
                    >InternalId</div>),
                accessor: 'internalId',
                width:270
            },
            {
                Header: () => (
                    <div
                        style={{
                            textAlign: "left"
                        }}
                    >Pair</div>),
                accessor: 'pair',
                width:100
            },
            {
                Header: () => (
                    <div
                        style={{
                            textAlign: "left"
                        }}
                    >Price</div>),
                accessor: 'price',
                width:100
            },
            {
                Header: () => (
                    <div
                        style={{
                            textAlign: "left"
                        }}
                    >Date Created</div>),
                accessor: 'dateCreated',
                width:200
            }
        ]
        return (
            (typeof this.props === "undefined" || this.props === null
                || typeof this.props.blotterInfos === "undefined" || this.props.blotterInfos === null))
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
                    <ReactTable
                        data={this.props.blotterInfos}
                        columns={columns}
                        getTrProps={(state, rowInfo, column, instance) => {
                            if (typeof rowInfo !== "undefined") {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        this.setState({
                                            ...this.state,
                                            selectedRow: rowInfo.index
                                        })
                                        this.handleRowClick(rowInfo, instance,"if")
                                    },
                                    style: {
                                        background: this.checkRowIsSelected(rowInfo) ? 'cornflowerblue' : '#2c2c2c',
                                        color: this.checkRowIsSelected(rowInfo) ? 'black' : 'white'
                                    },
                                }
                            }
                            else {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        this.handleRowClick(rowInfo, instance, "else")
                                    },
                                    style: {
                                        background: '#2c2c2c',
                                        color: 'white'
                                    },
                                }
                            }
                        }}

                    />
                </div>
        );
    }


    componentDidMount = () => {
        this.props.fetchBlotterFromEndpoint();
        this.initInterApp();
    }

    //static getDerivedStateFromProps(nextProps, prevState) {
    //    if (nextProps.blotterInfos !== prevState.blotterInfos) {
    //        return { someState: nextProps.blotterInfos };
    //    }
    //    else return null;
    //}

    //componentDidUpdate(prevProps, prevState) {
    //    if (prevProps.blotterInfos !== this.props.blotterInfos) {
    //        //Perform some operation here
    //        this.setState({
    //            ...this.state,
    //            blotterInfos: this.props.blotterInfos
    //        })

    //    }
    //}


    //NOTE : This method will be deprecated in near future should use above methods
    componentWillReceiveProps = (nextProps) => {
        var wasBlotterLoadingError = nextProps.blotterLoadingError;
        if (wasBlotterLoadingError) {
            alert("Could not load blotter");
        }
    }

    checkRowIsSelected = (rowInfo) => {
        var result = false;
        if (typeof rowInfo !== "undefined" && typeof this.state !== "undefined" && this.state != null) {
            result= rowInfo.index === this.state.selectedRow ? true : false;
        }
        console.log("result", result);
        return result;
    }

    handleRowClick = async (rowInfo, instance, fromwhere) => {
        console.log(rowInfo);
        if (typeof rowInfo !== "undefined") {
            await showChartWindow(rowInfo.row.pair);
        }
    }

    isSelected = (rowInfo) => {
        return false;
    }

    handleUndockClick = () => {
        Layouts.snapAndDock.undockWindow();
    }

    handleUndockAllClick = () => {
        Layouts.snapAndDock.undockGroup();
    }


    initInterApp = () => {
        self = this;
 
        fin.desktop.InterApplicationBus.subscribe("*","created-trade-from-tile",
            function (message, uuid) {
                self.props.fetchBlotterFromEndpoint();
            });
    };
}

export const Blotter = connect<BlotterProps, BlotterActions, RootState>(
    state => ({
        blotterInfos: state.blotter.blotterInfos,
        blotterLoadingError: state.blotter.blotterLoadingError
    }),
    {
        fetchBlotterFromEndpoint: fetchBlotterFromEndpoint,
    }
)(BlotterInner);


export const BlotterComponent = () => (
    <Provider store={store}>
        <Blotter/>
    </Provider>
);
