import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
let middleware = [thunkMiddleware.withExtraArgument({ axios })];
if (process.browser) {
  middleware = [...middleware, createLogger({ collapsed: true })];
}

//action types
const GETTOKENS = "GETTOKENS";
const GETTOKEN = "GETTOKEN";

//action creators
export const setTokens = tokens => ({ type: GETTOKENS, tokens });
export const setToken = token => ({ type: GETTOKEN, token });

//initial state
const initialState = {
  tokens: [],
  token: {}
};

//thunks
export const fetchAllTokens = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        "https://virtserver.swaggerhub.com/AvareeWar/Test/1.0.0/securities",
        {
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "origin, x-requested-with, content-type, authorization",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
            contentType: "application/json",
            responseType: "application/json"
          }
        }
      );

      //console.log(data, "Securities");

      return dispatch(setTokens(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchSingleTokenFromId = token => {
  return async dispatch => {
    try {
      // https://virtserver.swaggerhub.com/AvareeWar/Test/1.0.0/securities/OFNT/stats?periodStart=1549968342000&periodEnd=1549968442000&unit=month

      let security =
        "https://virtserver.swaggerhub.com/AvareeWar/Test/1.0.0/securities/" +
        token.id +
        "/stats";

      const { data } = await axios.get(security, {
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type, authorization",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
          contentType: "application/json",
          responseType: "application/json"
        }
      });

      //console.log(data, "SingleToken");

      return dispatch(setToken(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchSingleToken = token => {
  return async dispatch => {
    try {
      // https://virtserver.swaggerhub.com/AvareeWar/Test/1.0.0/securities/OFNT/stats?periodStart=1549968342000&periodEnd=1549968442000&unit=month

      let security =
        "https://virtserver.swaggerhub.com/AvareeWar/Test/1.0.0/securities/" +
        token.id +
        "/stats?periodStart=" +
        token.periodStart +
        "&periodEnd=" +
        token.periodEnd +
        "&unit=" +
        token.unit;

      const { data } = await axios.get(security, {
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "origin, x-requested-with, content-type, authorization",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
          contentType: "application/json",
          responseType: "application/json"
        }
      });

      console.log(data, "SingleToken");

      return dispatch(setToken(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTOKENS:
      return { ...state, tokens: action.tokens }; //return all tokens
    case GETTOKEN:
      return { ...state, token: action.token }; //return single token
    default:
      return state; //return default empty state
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
