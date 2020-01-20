import React from "react";
import "./App.css";
import Main from "./client/pages/Main";

import { Provider } from "react-redux";
import store from "./client/redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
};

export default App;
