import React, { Component, Dispatch } from "react";
import Chart from "./Chart";
import { connect } from "react-redux";
import { fetchSingleTokenFromId } from "../redux/store";

type state = {
  selectedassest: any;
  token: any;
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
      token: {}
    };

    this.setAsset = this.setAsset.bind(this);
  }

  async setAsset(index: any) {
    await this.setState({ selectedassest: index }); //use selected asset in state for display purposes
    await this.props.fetchToken(index); //fetch single asset to pass stats in to graph
  }

  render() {
    const tokens = this.props.tokens || [];

    return (
      <div id="graphlayout">
        <div id="graph-maincontent">
          <div id="graph-selects">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  SELECT ASSET{" "}
                  {this.state.selectedassest.id ? (
                    <div>{" | " + this.state.selectedassest.id}</div>
                  ) : null}
                </div>
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {tokens ? (
                  tokens.map((index: any) => {
                    return (
                      <div key={index.id}>
                        <div className="dropdown-item">
                          <button
                            onClick={() => {
                              this.setAsset(index);
                            }}
                          >
                            {index.id}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>Empty Tokens</div>
                )}
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
