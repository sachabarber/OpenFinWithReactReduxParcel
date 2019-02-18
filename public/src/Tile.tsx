import * as React from 'react';
import * as ReactDOM from 'react-dom';

//scss
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../scss/index.scss';

//images
import tickGrayLogo from '../img/tickGray.png';
import tickColoredLogo from '../img/tickColored.png';

//components
import { Button } from 'react-bootstrap';
import HoverImage from "react-hover-image"
import { TileInfo } from './common/commonModels';

interface TileProps {
    tilePair: string;
    tilePrice: number;
}


export class Tile extends React.Component<TileProps, undefined> {
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