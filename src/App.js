// @flow
import * as React from "react";
import axios from "axios";
import CSVToJSON from "csvtojson";
import _ from "lodash";

import styles from "./App.module.css";
import { FilterContextProvider } from "./context/FilterContext";
import Sidebar from "./components/Sidebar";
import Chart from "./components/Chart";

const DATA_URL =
  "http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv";

function App(): React.Node {
  const [data, setData] = React.useState([]);
  const [campaigns, setCampaigns] = React.useState([]);
  const [datasources, setDatasources] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get(DATA_URL);
      CSVToJSON()
        .fromString(res.data)
        .then((source) => {
          setData(
            source.map((i) => ({
              ...i,
              Clicks: Number(i.Clicks),
              Impressions: Number(i.Impressions),
            }))
          );
          const campaigns = _.uniqBy(_.map(source, (i) => i.Campaign));
          const datasources = _.uniqBy(_.map(source, (i) => i.Datasource));
          setCampaigns(campaigns);
          setDatasources(datasources);
        });
    }
    fetchData();
  }, []);

  return (
    <FilterContextProvider>
      <div className={styles.dashboard}>
        <Sidebar campaigns={campaigns} datasources={datasources} />
        <Chart data={data} />
      </div>
    </FilterContextProvider>
  );
}

export default App;
