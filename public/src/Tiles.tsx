import * as React from 'react';
import * as ReactDOM from 'react-dom';

//scss
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../scss/index.scss';

//components
import { Button } from 'react-bootstrap';
import HoverImage from "react-hover-image"
import { Tile } from './Tile';
import { TileInfo } from './common/commonModels';

//Redux
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { RootState } from './redux/root';
import { connect } from 'react-redux';
import { fetchTilesFromEndpoint } from './redux/tiles';

interface TilesProps {
    tileInfos: TileInfo[];
}

interface TilesActions {
    fetchTilesFromEndpoint: any;
}

interface TilesState { }

class TilesInner extends React.Component<TilesProps & TilesActions, TilesState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            (this.props.tileInfos === undefined)
                ? <h3>loading</h3>
                : <div id="tileContainer">
                    <ul id="listOfTiles">
                        {
                            this.props.tileInfos.map(d => <Tile tilePair={d.tilePair} tilePrice={d.tilePrice} />)
                        }
                    </ul>
                </div>
        );
    }

    componentDidMount() {
        this.props.fetchTilesFromEndpoint();
    }
}

export const Tiles = connect<TilesProps, TilesActions, RootState>(
    state => ({
        tileInfos: state.tiles.tileInfos,
    }),
    {
        fetchTilesFromEndpoint: fetchTilesFromEndpoint,
    }
)(TilesInner);


export const TilesComponent = () => (
    <Provider store={store}>
        <Tiles />
    </Provider>
);
