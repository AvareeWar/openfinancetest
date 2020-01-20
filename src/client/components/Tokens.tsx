import React, { Component } from "react";
import TokensModel from "../models/TokensModel";

export default class Tokens extends Component<TokensModel> {

  render() {
    console.log(this.props, "TOKENS PROPS");
    return (
      <div>
        <div>test</div>
      </div>
    );
  }
}
