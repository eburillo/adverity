// @flow
import * as React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";

import styles from "./Chart.module.css";

import { FilterContext } from "../context/FilterContext";
import Title from "../atoms/Title";
import transformer from "../helpers/transformer";

type Data = Array<{
  Date: string,
  Datasource: string,
  Campaign: string,
  Clicks: number,
  Impressions: number,
}>;

type TransformedData = {
  clicks: number,
  impressions: number,
};

type Filters = {
  datasources: Array<string>,
  campaigns: Array<string>,
};

const setChartsOptions = (data: TransformedData) => {
  return {
    title: {
      text: "",
    },
    chart: {
      type: "spline",
    },
    series: [
      {
        data: _.map(data, (i) => i.clicks),
        name: "Clicks",
      },
      {
        data: _.map(data, (i) => i.impressions),
        name: "Impressions",
        yAxis: 1,
      },
    ],
    xAxis: {
      categories: Object.keys(data),
    },
    yAxis: [
      {
        title: {
          text: "Clicks",
        },
      },
      {
        title: {
          text: "Impressions",
        },
        opposite: true,
      },
    ],
  };
};

const getChartTitle = ({ datasources, campaigns }: Filters) => {
  const datasourcesText = !_.isEmpty(datasources)
    ? `Datasources: ${datasources.join(",")}`
    : "All Datasources";
  const campaignsText = !_.isEmpty(campaigns)
    ? `Campaigns: ${campaigns.join(",")}`
    : "All Campaigns";

  return `${datasourcesText}; ${campaignsText}`;
};

function Chart({ data }: { data: Data }): React.Node {
  const [filters] = React.useContext(FilterContext);
  const chartData = transformer(data, filters);

  return (
    <div className={styles.container}>
      <Title primary text={getChartTitle(filters)} />
      <HighchartsReact
        highcharts={Highcharts}
        options={setChartsOptions(chartData)}
      />
    </div>
  );
}

export default Chart;
