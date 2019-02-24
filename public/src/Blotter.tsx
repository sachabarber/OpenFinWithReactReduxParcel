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
    blotterInfos: BlotterInfo[];
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
            (typeof this.state === "undefined" || this.state === null
                || typeof this.state.blotterInfos === "undefined" || this.state.blotterInfos === null))
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
                    data={this.state.blotterInfos}
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
        console.log("componentWillReceiveProps state", this.state);
        console.log("new props", nextProps.blotterInfos);
        var newItemsFromProps = nextProps.blotterInfos;
        this.setState({
            blotterInfos: nextProps.blotterInfos
        })
    }

    componentDidMount = () => {
        this.props.fetchBlotterFromEndpoint();
        this.initInterApp();
        this.setState({
            selectedRow: -1,
            blotterInfos: new Array<BlotterInfo>()
        })
        console.log("componentDidMount state", this.state);

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
        this.props
        self = this;

        console.log("Init with interapp called");
        fin.desktop.InterApplicationBus.addSubscribeListener(function (uuid, topic) {
            console.log("The application " + uuid + " has subscribed to " + topic);
        });

        fin.desktop.InterApplicationBus.subscribe("*","create-deal-from-tile",
            function (message, uuid) {
                var _message = "The application " + uuid + " sent this message " + message;
                console.log(_message.pair);
                var messagePair = message.pair;
                var messagePrice = formatTo2Places(message.price);
                var newBlotterInfo = new BlotterInfo(self.createGuid(), messagePair, messagePrice, self.formatDate(Date.now()));
                self.setState({
                    blotterInfos: [...self.state.blotterInfos, newBlotterInfo]
                })
            });
    };


    formatDate = (date) => {
        var d = new Date(date);
        return [(d.getMonth() + 1).padLeft(),
        d.getDate().padLeft(),
        d.getFullYear()].join('/') + ' ' +
            [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()].join(':');
    }

    createGuid = () => {

        var r = (new Date()).getTime().toString(16) + Math.random().toString(16).substring(2) + "0".repeat(16);
        return r.substr(0, 8) + '-' + r.substr(8, 4) + '-4000-8' + r.substr(12, 3) + '-' + r.substr(15, 12);
    }
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
        <Blotter />
    </Provider>
);
