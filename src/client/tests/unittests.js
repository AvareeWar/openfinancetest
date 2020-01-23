import enzyme, { mount } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
// Enzyme.configure({ adapter: new EnzymeAdapter() });
import Layout from "../components/Layout";
import React from "react";
import setTokens from "../redux/store";
const { expect } = require("chai");
const adapter = new Adapter();
enzyme.configure({ adapter });

describe("WholeProject", () => {
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
