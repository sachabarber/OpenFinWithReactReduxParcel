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

class BlotterInner extends React.Component<BlotterProps & BlotterActions, BlotterState> {
    constructor(props: any) {
        super(props);

        this.setState({
            selectedRow: -1
        })
    }

    render() {

        const columns = [
            {
                Header: 'Pair',
                accessor: 'pair' 
            },
            {
                Header: 'Price',
                accessor: 'price'
            },
            {
                Header: 'Date Created',
                accessor: 'dateCreated'
            }
        ]
        return (
            (this.props.blotterInfos === undefined)
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
                                        selectedRow: rowInfo.index
                                    });
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

    componentDidMount() {
        this.props.fetchBlotterFromEndpoint();
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
