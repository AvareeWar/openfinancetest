import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { setTokens } from "./client/redux/store";

test("renders learn react link", () => {
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

const tokens = {
  data: [
    {
      id: "OFNT",
      name: "Openfinance Token",
      class: "private-equity"
    }
  ]
};

test("set/fetch tokens", () => {
  expect(setTokens(tokens)).toStrictEqual({
    type: "GETTOKENS",
    tokens
  });
});
