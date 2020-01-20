import React, { Component, Dispatch } from "react";
import { fetchAllTokens } from "../redux/store";
import { connect } from "react-redux";
import Performers from "./Performers";
import Graph from "./Graph";

type state = {
  time: any;
  tokens: any;
};

interface Props {
  fetchTokens: any;
  tokens: any;
}

export class Layout extends Component<Props, state> {
  constructor(Props: any) {
    super(Props);
    this.state = {
      time: "Hour", //defaults to hour
      tokens: []
    };
    this.setTimeline = this.setTimeline.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchTokens(); //fetch security tokens from redux store -> props
  }

  setTimeline(timeline: any) {
    this.setState({ time: timeline });
  }

  render() {
    return (
      <div id="layout">
        <div id="main-content">
          <div id="main-timeframe">
            <div id="timeframe-adjust">
              <div id="timeframe"> TIME FRAME</div>
              <div id="timeframe-drop">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div>{this.state.time}</div>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        this.setTimeline("Hour");
                      }}
                    >
                      Hour
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        this.setTimeline("Day");
                      }}
                    >
                      Day
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        this.setTimeline("Week");
                      }}
                    >
                      Week
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        this.setTimeline("Month");
                      }}
                    >
                      Month
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="main-holder">
            <Performers />
            <Graph time={this.state.time} tokens={this.props.tokens.data} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: state) => ({
  tokens: state.tokens
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchTokens: () => dispatch(fetchAllTokens())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
