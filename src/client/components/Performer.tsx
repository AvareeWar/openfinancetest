import React, { Component } from "react";

interface Props {
  info: any;
}

export default class Performer extends Component<Props> {
  render() {
    //console.log(this.props.info, "in Performer");
    return (
      <div className="perfs">
        <div className="perfs-attr">{this.props.info.data.securityId}</div>
        <div className="perfs-attr">{this.props.info.data.period.o}</div>
        <div className="perf-attr">{this.props.info.data.period.c}</div>
        <div className="perf-attr">{this.props.info.data.period.c}</div>
        <hr className="perfhr" />
      </div>
    );
  }
}
