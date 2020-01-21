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
                <div className="dropdown" id="droptime">
                  <button
                    className="btn btn-light btn-small dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="dropdowntimeframe"
                  >
                    <div id="pasttimetext">Past {this.state.time}</div>
                    {/* Past {this.state.time} */}
                  </button>

                  <div
                    className="dropdown-menu"
                    id='timedropdownmenu'
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div
                      className="dropdown-item"
                      id='dropdowntimeitem' //typically not supposed to have several ID's with the same name but to overwrite bootstrap this is needed
                      onClick={() => {
                        this.setTimeline("Hour");
                      }}
                    >
                      <div className="timebutton">Hour</div>
                    </div>

                    <div
                      className="dropdown-item"
                      id='dropdowntimeitem'
                      onClick={() => {
                        this.setTimeline("Day");
                      }}
                    >
                      <div className="timebutton">Day</div>
                    </div>
                    <div
                      className="dropdown-item"
                      id='dropdowntimeitem'
                      onClick={() => {
                        this.setTimeline("Week");
                      }}
                    >
                      <div className="timebutton">Week</div>
                    </div>
                    <div
                      className="dropdown-item"
                      id='dropdowntimeitem'
                      onClick={() => {
                        this.setTimeline("Month");
                      }}
                    >
                      <div className="timebutton">Month</div>
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
