import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../scss/index.scss';

import tickGrayLogo from '../img/tickGray.png';
import tickColoredLogo from '../img/tickColored.png';

import HoverImage from "react-hover-image"

//TODO : This should come from redux store
const data = [
    { "pair": "USDGBP", "price": 0.78 },
    { "pair": "USDEUR", "price": 0.89 },
    { "pair": "USDCAN", "price": 1.32 },
    { "pair": "USDCHF", "price": 1.01 },
    { "pair": "GBPCAN", "price": 1.71 },
    { "pair": "GBPAUD", "price": 1.81 },
    { "pair": "GBPEUR", "price": 1.14 },
    { "pair": "GBPPLN", "price": 4.95 },
    { "pair": "GBPFLN", "price": 4.95 }
];

//NOT WORKING
//const listItems = data.map((d) =>
//    <Tile tilePair={d.pair} tilePrice={d.price} />
//);

//THIS WORKS
const listItems = data.map((d) =>
    <li key={ d.pair }>
        <div className="card">
            <div className="tileDescription">
                <p className="tilePair">{d.pair}</p>
                <p className="tilePrice">{d.price}</p>
            </div>
            <div className="tileCommands">
                <span>
                    <HoverImage className="tileImages"
                        src={tickGrayLogo}
                        hoverSrc={tickColoredLogo} />
                </span>
            </div>
        </div>
    </li>


);

class Tiles extends React.Component<undefined, undefined> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div id="tileContainer">
                <ul id="listOfTiles">
                    {listItems}
                </ul>
            </div>
        );
    }
}


interface TileProps {
    tilePair: string;
    tilePrice: number;
}

class Tile extends React.Component<TileProps, undefined> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <li key={this.props.tilePair}>
                <div className="card">
                    <div className="tileDescription">
                        <p className="tilePair">{this.props.tilePair}</p>
                        <p className="tilePrice">{this.props.tilePrice}</p>
                    </div>
                    <div className="tileCommands">
                        <span>
                            <HoverImage className="tileImages"
                                src={tickGrayLogo}
                                hoverSrc={tickColoredLogo}
                                onClick={this.handleTilePlaceTradeClick} />
                        </span>
                    </div>
                </div>
            </li>
        );
    }

    handleTilePlaceTradeClick = async (e) => {
        alert("TODO : placing trade, will send on bus to grid window");
    }
}

export const TilesComponent = () => (
    <Tiles/>
);
