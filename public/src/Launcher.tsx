import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { interval } from 'rxjs';

//scss
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../scss/index.scss';

//images
import chartColoredLogo from '../img/chartColored.png';
import chartGrayLogo from '../img/chartGray.png';
import tableColoredLogo from '../img/tableColored.png';
import tableGrayLogo from '../img/tableGray.png';
import tilesColoredLogo from '../img/tilesColored.png';
import tilesGrayLogo from '../img/tilesGray.png';
import HoverImage from "react-hover-image"

//components
import { showChartWindow } from "./utils/ChartUtils"
import { LayoutService } from "./utils/LayoutUtils"


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

async function initWithOpenFin() {

    const app = await fin.Application.getCurrent();
    const mainWindow = await app.getWindow();

    //var bounds = await mainWindow.getBounds();
    //var info = await mainWindow.getInfo();
    //var options = await mainWindow.getOptions();

    //console.log("launcer bounds", bounds);
    //console.log("launcer info", info);
    //console.log("launcer options", options);


    interval(10000).subscribe(async x => {
        await LayoutService.getInstance().persistWindows(mainWindow);
    });
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
        await fin.Window.create({
            name: "Blotter",
            url: "/blotter",
            defaultWidth: 800,
            defaultHeight: 200,
            resizable: true,
            autoShow: true
        });
    }

    handleChartClick = async (e) => {
        await showChartWindow('BTCEUR');
    }

    handleTilesClick = async (e) => {
        await fin.Window.create({
            name: "Tiles",
            url: "/tiles",
            defaultWidth: 560,
            defaultHeight: 350,
            width: 560
            height: 350,
            resizable: false,
            autoShow: true
        });
    }
}



export const LauncherComponent = () => (
    <Launcher/>
);
