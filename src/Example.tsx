import React, { useContext } from "react";
import {
    buildChartTheme,
    DataContext,
    DataProvider,
    LineSeries,
    Tooltip,
    XYChart
} from "@visx/xychart";

type Datum = { x: string; y: number };

const data: Datum[] = new Array(31).fill(null).map((_, i) => ({
    x: `2020-01-${i + 1 < 10 ? `0${i + 1}` : i + 1}`,
    y: 100 * Math.random() * i + 50
}));

const customTheme = buildChartTheme({
    backgroundColor: "#f05454",
    colors: ["#e8e8e8", "#2b2e4a"],
    gridColor: "#30475e",
    gridColorDark: "#222831",
    svgLabelSmall: { fill: "#30475e" },
    svgLabelBig: { fill: "#30475e" },
    tickLength: 4
});

const ChartBackground = ({ patternId }: { patternId: string }) => {
    const { theme, width, height, margin, innerHeight, innerWidth } = useContext(
        DataContext
    );
    return (
        <>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={theme?.backgroundColor ?? "#fff"}
            />
            <rect
                x={margin!.left}
                y={margin!.top}
                width={innerWidth}
                height={innerHeight}
                fill={`url(#${patternId})`}
                fillOpacity={0.3}
            />
        </>
    );
};

interface IChart {
    width: number;
    height: number;
    xAccessor?: (d: Datum) => string;
    yAccessor?: (d: Datum) => number;
}

const Chart: React.FC<IChart> = ({
    width,
    height,
    xAccessor = (d: Datum) => d.x,
    yAccessor = (d: Datum) => d.y
}) => (
    <>
        <DataProvider
            xScale={{ type: "band", paddingInner: 0.5 }}
            yScale={{ type: "linear" }}
            theme={customTheme}
        >
            <XYChart
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                width={width = 200}
                height={height = 150}// / 3}
            >
                <ChartBackground patternId="chart-bg" />
                <LineSeries
                    dataKey="line-a"
                    data={data}
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                />
                <LineSeries
                    dataKey="line-b"
                    data={data.map((d) => ({ ...d, y: d.y * Math.random() }))}
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                />
                <Tooltip<Datum>
                    showVerticalCrosshair
                    snapTooltipToDatumX
                    renderTooltip={({ tooltipData, colorScale }) =>
                        tooltipData?.nearestDatum?.key && (
                            <>
                                <div style={{ color: colorScale && colorScale(tooltipData?.nearestDatum?.key) }}>
                                    {tooltipData?.nearestDatum?.key}
                                </div>
                                <br />
                                {xAccessor(
                                    tooltipData?.datumByKey[tooltipData?.nearestDatum?.key].datum
                                )}
                                :{" "}
                                {yAccessor(
                                    tooltipData?.datumByKey[tooltipData?.nearestDatum?.key].datum
                                ).toFixed(2)}
                            </>
                        )
                    }
                />
            </XYChart>
        </DataProvider>
    </>
);

export default Chart;
