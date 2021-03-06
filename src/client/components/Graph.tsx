import React, { Component, Dispatch } from "react";
import Chart from "./Chart";
import { connect } from "react-redux";
import { fetchSingleTokenFromId } from "../redux/store";

type state = {
  selectedassest: any;
  token: any;
  stats: any;
  data: any;
  c: any;
};

interface Props {
  time: any;
  token: any;
  tokens: any;
  fetchToken: any;
}

export class Graph extends Component<Props, state> {
  constructor(Props: any) {
    super(Props);
    this.state = {
      selectedassest: {},
      token: {},
      stats: [],
      data: {},
      c: 0
    };

    this.setAsset = this.setAsset.bind(this);
  }

  async setAsset(index: any) {
    await this.setState({ selectedassest: index }); //use selected asset in state for display purposes
    await this.props.fetchToken(index); //fetch single asset to pass stats in to graph
  }

  render() {
    const tokens = this.props.tokens || [];
    let tkn = this.props.token.data || {};

    let per = tkn.period || {};
    let o = per.o || 0;
    let c = per.c || 0;
    let calc = (c / o - 1) * 100;

    return (
      <div id="graphlayout">
        <div id="graph-maincontent">
          <div id="graph-selects">
            <div className="dropdown">
              <button
                className="btn  dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="selectedAssetTextHolder">
                  SELECTED ASSET{" "}
                  {this.state.selectedassest.id ? (
                    <div style={{ marginLeft: "10%", paddingRight: "5%" }}>
                      {/* <div id="veritcalasset"></div> */}
                      {this.state.selectedassest.id}
                    </div>
                  ) : null}
                </div>
              </button>
              <div
                className="dropdown-menu"
                id="dropdownmenuid"
                aria-labelledby="dropdownMenuButton"
              >
                {tokens ? (
                  tokens.map((index: any) => {
                    return (
                      <div key={index.id}>
                        <div className="dropdown-item">
                          <div
                            className="asset-button"
                            onClick={() => {
                              this.setAsset(index);
                            }}
                          >
                            <div className="assettext">{index.id}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>Empty Tokens</div>
                )}
              </div>
            </div>
            <div id="selectsholder">
              <div className="selectsitems">
                <div className="lasttradeprice" style={{ fontStyle: "bold" }}>
                  Last Trade Price:
                </div>
                <div className="lasttradeprice">{c}</div>{" "}
              </div>
              <div className="selectsitems">
                <div id="vertical"></div>
              </div>
              <div className="selectsitems">
                <div className="lasttradeprice">Change:</div>{" "}
                <div className="lasttradepricegreen">
                  {calc ? calc.toString()[0] : null}%{" "}
                </div>
              </div>
            </div>
          </div>
          <div id="graph">
            <Chart time={this.props.time} asset={this.props.token} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: state) => ({
  token: state.token
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchToken: (token: any) => dispatch(fetchSingleTokenFromId(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
