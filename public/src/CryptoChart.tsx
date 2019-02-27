import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
    BarSeries,
    AreaSeries,
} from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";


type ChartType = 'svg' | 'hybrid';

interface AreaChartProps {
    data: any[],
    width: number,
    ratio: number,
};

//class AreaChart extends React.Component<AreaChartProps, any> {
//    constructor(props: AreaChartProps) {
//        super(props);
//    }

//    render() {
//        const { data, width, ratio } = this.props;
//        const type = 'svg';
//        return (
//            <ChartCanvas ratio={ratio} width={width} height={400}
//                margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
//                seriesName="TEST SERIES"
//                data={data} type={type} xScale={d3.scaleTime()}
//                xAccessor={(d: any) => d.date}
//                xExtents={[new Date(2017, 4, 20), new Date(2017, 4, 30)]}
//            >
//                <Chart id={0} yExtents={(d: any) => d.close}>
//                    <XAxis axisAt="bottom" orient="bottom" ticks={10} />
//                    <YAxis axisAt="left" orient="left" />
//                    <AreaSeries
//                        yAccessor={(d: any) => d.close}
//                    />
//                </Chart>
//            </ChartCanvas>
//        );
//    }
//}


class AreaChart extends React.Component<AreaChartProps, any> {
    render() {
        const { data: initialData, width, ratio } = this.props;
        const type = 'svg';

        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);
        const {
			data,
            xScale,
            xAccessor,
            displayXAccessor,
		} = xScaleProvider(initialData);

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];
        return (
            <ChartCanvas height={400}
                ratio={ratio}
                width={width}
                margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
                type={type}
                seriesName="MSFT"
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                xExtents={xExtents}
            >
                <Chart id={1}
                    yExtents={d => [d.high, d.low]}
                >
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="right" orient="right" ticks={5} />

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%Y-%m-%d")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />

                    <AreaSeries yAccessor={d => d.close} />

                    <SingleValueTooltip
                        xLabel="Date" /* xLabel is optional, absence will not show the x value */ yLabel="C"
                        yAccessor={d => d.close}
                        xDisplayFormat={timeFormat("%Y-%m-%d")} yDisplayFormat={format(".2f")}
                        /* valueStroke="green" - optional prop */
                        /* labelStroke="#4682B4" - optional prop */
                        origin={[-40, 0]} />
                    <SingleValueTooltip
                        yLabel="Volume" yAccessor={(d) => d.volume}
                        origin={[-40, 20]} />
                </Chart>
                <Chart id={2}
                    yExtents={d => d.volume}
                    height={150} origin={(w, h) => [0, h - 150]}
                >
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />

                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".4s")} />

                    <BarSeries yAccessor={d => d.volume}
                        stroke fill={(d) => d.close > d.open ? "#6BA583" : "#FF0000"}
                        opacity={0.4}
                        widthRatio={1} />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        );
    }
}

export const FixedWidthChart: any = fitWidth(AreaChart);
