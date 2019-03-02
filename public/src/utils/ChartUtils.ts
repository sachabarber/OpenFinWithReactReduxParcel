import { tsvParse, csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

export function parseData(parse) {
    return function (d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        return d;
    };
}

export async function showChartWindow(pairToShowInChart) {

    const app = await fin.Application.getCurrent();
    var childWindows = await app.getChildWindows();
    var foundOpenChildWindow = false;
    childWindows.map(async (win, index) => {
        if (win.identity.name === "Charts") {
            foundOpenChildWindow = true;
            return;
        }
    });

    if (foundOpenChildWindow) {
        console.log("publishing view-chart-for-pair", pairToShowInChart);
        fin.desktop.InterApplicationBus.publish("view-chart-for-pair", {
            pair: pairToShowInChart
        });

    }
    else {
        await fin.Window.create({
            name: "Charts",
            url: "/chart?pair=" + pairToShowInChart,
            defaultWidth: 600,
            defaultHeight: 500,
            width: 600
            height: 350,
            resizable: true,
            autoShow: true
        });
    }
}

export const parseDate = timeParse("%Y-%m-%d");

