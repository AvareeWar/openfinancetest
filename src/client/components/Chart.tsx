import React, { Component } from "react";
import * as Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import addHighchartsMore from "highcharts/highcharts-more";

addHighchartsMore(Highcharts);

type state = {
  securityId: string;
  period: any;
  s: number;
  h: number;
  l: number;
  c: number;
  stats: any;
  options: any;
};

type Asset = {
  time: any;
  asset: any;
};

// Graph displays candlesticks for open-high-low-close (OHLC) data in the main part for the selected timeframe, and volume per period (usually “day”, but “minute” in the case of the “past 60 minutes” selection and “hour” in the case of the “past day” selection).

export default class Chart extends Component<Asset, state> {
  render() {
    let stats = this.props.asset.data || {};
    let period = stats.period || {};

    console.log(this.props, "CHART PROPS");

    let items: any = {
      rangeSelector: {
        selected: 0
      },

      title: {
        text: stats.securityId
      },

      series: [
        {
          type: "ohlc",
          name: stats.sercurityId,
          data: [
            period.s,
            period.e,
            period.o,
            period.h,
            period.l,
            period.c,
            period.v
          ],
          dataGrouping: {
            forced: true,
            units: [
              ["hour", [1, 2, 3, 4, 6, 8, 12]],
              ["day", [1]],
              ["week", [1]],
              ["month", [1, 3, 6]],
              ["year", null]
            ]
          }
        }
      ]
    };

    return (
      <div>
        <div id="chart">
          {/* { myChart ? myChart : null} */}
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={items}
          ></HighchartsReact>
        </div>
      </div>
    );
  }
}
