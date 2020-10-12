// @flow
import _ from "lodash";

type Data = Array<{
  Date: string,
  Datasource: string,
  Campaign: string,
  Clicks: number,
  Impressions: number,
}>;

type TransformedData = { clicks: number, impressions: number };

type Filters = {
  campaigns: Array<string>,
  datasources: Array<string>,
};

export default function transformer(
  data: Data,
  filters: Filters
): TransformedData {
  const { campaigns, datasources } = filters;

  return _.mapValues(_.groupBy(data, "Date"), (item) => {
    let filteredRow = item;

    filteredRow = _.isEmpty(datasources)
      ? filteredRow
      : item.filter((i) => datasources.includes(i.Datasource));

    filteredRow = _.isEmpty(campaigns)
      ? filteredRow
      : item.filter((i) => campaigns.includes(i.Campaign));

    return {
      clicks: _.sumBy(filteredRow, "Clicks"),
      impressions: _.sumBy(filteredRow, "Impressions"),
    };
  });
}
