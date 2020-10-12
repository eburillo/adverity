// @flow
import * as React from "react";

import { FilterContext } from "../context/FilterContext";
import styles from "./Sidebar.module.css";
import Title from "../atoms/Title";
import FilterSection from "./FilterSection";

type Props = {
  campaigns?: Array<string>,
  datasources?: Array<string>,
};

function Sidebar({ campaigns = [], datasources = [] }: Props): React.Node {
  const [selectedDatasources, setSelectedDatasources] = React.useState([]);
  const [selectedCampaigns, setSelectedCampaigns] = React.useState([]);
  const [filters, setFilters] = React.useContext(FilterContext);

  const handleApplyFilters = () => {
    setFilters({
      campaigns: selectedCampaigns,
      datasources: selectedDatasources,
    });
  };

  return (
    <div className={styles["sidebar"]}>
      <Title primary text={"Filter dimension values"} />
      <div className={styles["sidebar-content"]}>
        <div className={styles["filters-container"]}>
          <FilterSection
            options={datasources}
            type={"datasources"}
            setValues={setSelectedDatasources}
          />
          <FilterSection
            options={campaigns}
            type={"campaigns"}
            setValues={setSelectedCampaigns}
          />
        </div>
        <div className={styles["filter-cta-container"]}>
          <button className={styles["filter-cta"]} onClick={handleApplyFilters}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
