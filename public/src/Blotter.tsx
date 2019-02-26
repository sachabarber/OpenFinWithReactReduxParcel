import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactTable from "react-table";


//scss
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../scss/index.scss';
import 'react-table/react-table.css'

//components
import { Button } from 'react-bootstrap';
import HoverImage from "react-hover-image"
import { Tile } from './Tile';
import { BlotterInfo } from './common/commonModels';
import { formatTo2Places } from './common/commonFunctions';

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
}

interface BlotterActions {
    fetchBlotterFromEndpoint: any;
}

interface BlotterState {
    selectedRow: number;
}

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
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
        );
    }



    componentDidMount = () => {
        this.props.fetchBlotterFromEndpoint();
        this.initInterApp();
    }

    checkRowIsSelected = (rowInfo) => {
        var result = false;
        if (typeof rowInfo !== "undefined" && typeof this.state !== "undefined" && this.state != null) {
            result= rowInfo.index === this.state.selectedRow ? true : false;
        }
        console.log("result", result);
        return result;
    }

    handleRowClick = (rowInfo, instance, fromwhere) => {
        if (typeof rowInfo !== "undefined") {
            console.log('rowInfo=', rowInfo);
            console.log('instance=', instance);
            alert(rowInfo.row.pair);
        }
    }

    isSelected = (rowInfo) => {
        return false;
    }

    //publishMessage = () => {
    //    fin.desktop.InterApplicationBus.publish("create-deal-from-tile", {
    //        pair: this.props.tilePair,
    //        price: this.state.tilePriceRaw
    //    });
    //}


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
