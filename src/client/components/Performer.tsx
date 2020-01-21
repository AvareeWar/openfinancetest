import React, { Component } from "react";

interface Props {
  info: any;
}

export default class Performer extends Component<Props> {
  render() {
    console.log(this.props.info, "in Performer");
    let calc = this.props.info.period.c / this.props.info.period.o - 1;

    return (
      <div className="perfs">
        <div className="perfs-attr">{this.props.info.securityId}</div>
        <div className="perfs-attr">{this.props.info.period.o}</div>
        <div className="perf-attr">{this.props.info.period.c}</div>
        <div className="perf-attr">
          <div className="perf-percent">{calc.toString()}%</div>
        </div>
        <hr className="perfhr" />
      </div>
    );
  }
}
