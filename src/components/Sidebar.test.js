import React from "react";
import { shallow } from "enzyme";

import { FilterContextProvider } from "../context/FilterContext";
import Sidebar from "./Sidebar";

const wrapper = (children) => (
  <FilterContextProvider>{children}</FilterContextProvider>
);

it("renders without crashing", () => {
  shallow(wrapper(<Sidebar />));
});
