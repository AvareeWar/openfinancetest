import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import Performer from "./Performer";
import { fetchBestTokens } from "../redux/store";

type state = {
  besttokens: any;
  securityId: any;
};

interface Props {
  besttokens: any;
  fetchBestTokens: any;
}

export class Performers extends Component<Props, state> {
  async componentDidMount() {
    await this.props.fetchBestTokens();
  }

  render() {
    let arr = this.props.besttokens || [];
    console.log(this.props.besttokens, "PERFORMERS PROPS");

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
            <div id="perfs">
              {arr ? (
                arr.map((i: any) => {
                  console.log(i.securityId);
                  return <Performer key={i.securityId} info={i} />;
                })
              ) : (
                <div>EMPTY</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: state) => ({
  besttokens: state.besttokens
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchBestTokens: () => {
    dispatch(fetchBestTokens());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Performers);
