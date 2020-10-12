// @flow
import * as React from "react";

export const FilterContext: Object = React.createContext();

type Props = {
  children: React.Node,
};

const FILTERS_INITIAL_STATE = {
  campaigns: [],
  datasources: [],
};

export const FilterContextProvider = (props: Props): React.Node => {
  const [filters, setFilters] = React.useState(FILTERS_INITIAL_STATE);

  return (
    <FilterContext.Provider value={[filters, setFilters]}>
      {props.children}
    </FilterContext.Provider>
  );
};
