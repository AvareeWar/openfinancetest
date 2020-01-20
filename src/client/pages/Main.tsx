import React, { Component } from "react";
import Layout from "../components/Layout";
import { connect } from "react-redux";

export class Main extends Component {
  render() {
    return <Layout></Layout>;
  }
}

export default connect()(Main);
