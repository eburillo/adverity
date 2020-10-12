// @flow
import * as React from "react";
import SelectSearch from "react-select-search/dist/cjs";

import styles from "./FilterSection.module.css";
import Title from "../atoms/Title";

type Props = {
  options: Array<string>,
  type: string,
  setValues: Function,
};

const parseSelectOptions = (options) =>
  options.map((o) => ({ name: o, value: o }));

function FilterSection({ options, type, setValues }: Props): React.Node {
  return (
    <div>
      <Title text={type} />
      <SelectSearch
        className={(key) => styles[key]}
        printOptions="on-focus"
        multiple
        search
        options={parseSelectOptions(options)}
        placeholder="All"
        onChange={(values) => setValues(values)}
      />
    </div>
  );
}

export default FilterSection;
