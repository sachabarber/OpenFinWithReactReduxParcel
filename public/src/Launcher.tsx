import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'react-bootstrap';
import '../scss/index.scss';
import chartColoredLogo from '../img/chartColored.png';
import chartGrayLogo from '../img/chartGray.png';

import tableColoredLogo from '../img/tableColored.png';
import tableGrayLogo from '../img/tableGray.png';

import tilesColoredLogo from '../img/tilesColored.png';
import tilesGrayLogo from '../img/tilesGray.png';

import HoverImage from "react-hover-image"


document.addEventListener("DOMContentLoaded", function () {
    init();
});

function init() {
    console.log("Dom Loaded ", this);
    try {
        fin.desktop.main(function () {
            initWithOpenFin();
        })
    } catch (err) {
        initNoOpenFin();
    }
};

function initWithOpenFin() {
    alert('openfin found ok');
}

function initNoOpenFin() {
    alert("OpenFin is not available - you are probably running in a browser.");
}


class Launcher extends React.Component<undefined, undefined> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div id="launcherDiv">
                
                <HoverImage className="launcherImages"
                    src={tableGrayLogo}
                    hoverSrc={tableColoredLogo}
                    onClick={this.handleTableClick} />
                <HoverImage className="launcherImages"
                    src={chartGrayLogo}
                    hoverSrc={chartColoredLogo}
                    onClick={this.handleChartClick} />
                <HoverImage className="launcherImages"
                    src={tilesGrayLogo}
                    hoverSrc={tilesColoredLogo}
                    onClick={this.handleTilesClick} />
            </div>
        );
    }

    handleTableClick = async (e) => {
        const win = await fin.Window.create({
            name: "Blotter",
            url: "/blotter",
            defaultWidth: 800,
            defaultHeight: 200,
            resizable: true,
            autoShow: true
        });
    }

    handleChartClick = async (e) => {
        const win = await fin.Window.create({
            name: "Charts",
            url: "/chart",
            defaultWidth: 600,
            defaultHeight: 400,
            resizable: false,
            autoShow: true
        });
    }

    handleTilesClick = async (e) => {
        const win = await fin.Window.create({
            name: "Tiles",
            url: "/tiles",
            defaultWidth: 600,
            defaultHeight: 400,
            resizable: false,
            autoShow: true
        });
    }
}



export const LauncherComponent = () => (
    <Launcher/>
);
