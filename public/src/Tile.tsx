import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { interval } from 'rxjs';

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


interface TileState {
    tilePriceRaw: number;
    tilePrice: string;
    isInitaialised: boolean;
}


export class Tile extends React.Component<TileProps, TileState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tilePrice: "0",
            tilePriceRaw: 0,
            isInitaialised:false
        };
    }

    render() {
        return (
            <li key={this.props.tilePair}>
                <div className="card">
                    <div className="tileDescription">
                        <p className="tilePair">{this.props.tilePair}</p>
                        <p className="tilePrice">{this.state.tilePrice}</p>
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

    componentDidMount() {
        interval(500).subscribe(x => {
            console.log('Next: ', x);
            this.randomlyJiggleState();
        });
        this.randomlyJiggleState();
    }

    handleTilePlaceTradeClick = async (e) => {
        alert("TODO : placing trade, will send on bus to grid window");
    }

    generateRandomNumber = (divisor) => {
        var self = this;
        return Math.random() / divisor
    }

    formatTo2Places = (theNum: number) => {
        var result: number = Math.round(theNum * 100) / 100
        return parseFloat(result.toString(10)).toFixed(2);
    }

    randomlyJiggleState = () => {
        var self = this;

        if (self.state === undefined || self.state == null)
            return;

        if (self.state.isInitaialised === true) {
            var isNegativeChance = self.generateRandomNumber(1.0);
            var fiddleFactor = self.generateRandomNumber(10.0);
            if (isNegativeChance > 0.5) {
                fiddleFactor = -fiddleFactor;
            }

            var newTilePriceRaw = self.state.tilePriceRaw + fiddleFactor
            var newTilePrice = self.formatTo2Places(newTilePriceRaw)

            self.setState((state, props) => ({
                tilePrice: newTilePrice,
                tilePriceRaw: newTilePriceRaw,
            }));            
        }
        else {

            var newTilePriceRaw = self.props.tilePrice
            var newTilePrice = self.formatTo2Places(newTilePriceRaw)

            self.setState((state, props) => ({
                tilePrice: newTilePrice,
                tilePriceRaw: newTilePriceRaw,
                isInitaialised:true
            }));
        }
    }
};


 
