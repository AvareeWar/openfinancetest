import Layout from "../components/Layout";
import React from "react";
import setTokens from "../redux/store";

import enzyme, { mount } from "enzyme";

describe("The Whole Project", () => {
  describe("<Layout> ", () => {
    it("renders initially without errors", () => {
      const wrapper = mount(<Layout />);
      expect(wrapper.text()).to.include("");
    });
  });

  describe("Redux store", () => {
    describe("set/fetch tokens", () => {
      const tokens = {
        data: [
          {
            id: "OFNT",
            name: "Openfinance Token",
            class: "private-equity"
          }
        ]
      };

      it("setTokens action creator", () => {
        expect(setTokens(tokens)).to.deep.equal({
          type: "GETTOKENS",
          tokens
        });
      });
    });
  });
});
