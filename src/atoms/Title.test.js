import React from "react";
import { render } from "@testing-library/react";
import Title from "./Title";

const MY_TITLE = "Welcome to Adverity";

test("renders one title", () => {
  const { getByText } = render(<Title text={MY_TITLE} />);
  const titleText = getByText(MY_TITLE);
  expect(titleText).toBeInTheDocument();
});
