import React, { Component } from "react";
import Performer from "./Performer";
const data = require("../../server/data");

interface props {
  info: {};
}

export default class Performers extends Component<{}> {
  //   componentDidMount() {
  //     let secs = data;
  //     console.log(secs, "secs");
  //   }

  render() {
    const arr = data.default || [];
    //console.log(arr, "data");

    return (
      <div id="performerslayout">
        <div id="performers-content">
          <div id="performers-title">BEST PERFORMERS</div>
          <div id="performers-holder">
            <div id="performers-attributes">
              <div className="perf-attr">Asset</div>
              <div className="perf-attr">Open Price</div>
              <div className="perf-attr">Close Price</div>
              <div className="perf-attr">Period Change</div>
            </div>
            {/* <div id="perfs"> */}
            {arr ? (
              arr.map((i: any) => {
                return <Performer key={i.data.securityId} info={i} />;
              })
            ) : (
              <div>EMPTY</div>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}
