import transformer from "./transformer";

const mockData = [
  {
    Campaign: "Like Ads",
    Clicks: 10,
    Datasource: "Facebook Ads",
    Date: "01.01.2019",
    Impressions: 20,
  },
  {
    Campaign: "B2B Leads",
    Clicks: 5,
    Datasource: "Google Adwords",
    Date: "01.01.2019",
    Impressions: 5,
  },
  {
    Campaign: "Offer Campaigns",
    Clicks: 1,
    Datasource: "Facebook Ads",
    Date: "02.01.2019",
    Impressions: 2,
  },
  {
    Campaign: "Like Ads",
    Clicks: 10,
    Datasource: "Facebook Ads",
    Date: "02.01.2019",
    Impressions: 10,
  },
];

it("transform all data", () => {
  const mockFilters = {
    campaigns: [],
    datasources: [],
  };
  const expected = {
    "01.01.2019": {
      clicks: 15,
      impressions: 25,
    },
    "02.01.2019": {
      clicks: 11,
      impressions: 12,
    },
  };

  expect(transformer(mockData, mockFilters)).toEqual(expected);
});

it("filter data by one datasource", () => {
  const mockFilters = {
    campaigns: [],
    datasources: ["Facebook Ads"],
  };
  const expected = {
    "01.01.2019": {
      clicks: 10,
      impressions: 20,
    },
    "02.01.2019": {
      clicks: 11,
      impressions: 12,
    },
  };

  expect(transformer(mockData, mockFilters)).toEqual(expected);
});

it("filter data by one campaign", () => {
  const mockFilters = {
    campaigns: ["B2B Leads"],
    datasources: [],
  };
  const expected = {
    "01.01.2019": {
      clicks: 5,
      impressions: 5,
    },
    "02.01.2019": {
      clicks: 0,
      impressions: 0,
    },
  };

  expect(transformer(mockData, mockFilters)).toEqual(expected);
});

it("filter data by campaign and datasource together", () => {
  const mockFilters = {
    campaigns: ["Like Ads"],
    datasources: ["Facebook Ads"],
  };
  const expected = {
    "01.01.2019": {
      clicks: 10,
      impressions: 20,
    },
    "02.01.2019": {
      clicks: 10,
      impressions: 10,
    },
  };

  expect(transformer(mockData, mockFilters)).toEqual(expected);
});
