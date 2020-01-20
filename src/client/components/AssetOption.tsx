import React, { Component } from "react";

interface props {
  option: {};
}

export default class AssetOption extends Component<props> {
  render() {
    console.log(this.props.option, "AssetOption Props");
    return (
      <div>
        <a className="dropdown-item"></a>
      </div>
    );
  }
}
