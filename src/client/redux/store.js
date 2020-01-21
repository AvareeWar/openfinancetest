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
const GETBESTTOKENS = "GETBESTTOKENS";

//action creators
export const setTokens = tokens => ({ type: GETTOKENS, tokens });
export const setToken = token => ({ type: GETTOKEN, token });
export const setBestTokens = besttokens => ({
  type: GETBESTTOKENS,
  besttokens
});

//initial state
const initialState = {
  tokens: [],
  token: {},
  besttokens: []
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

export const fetchBestTokens = () => {
  return async dispatch => {
    try {
      const tokens = await axios.get(
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

      console.log(tokens.data.data, "tokens");
      let tkns = [];

      if (tokens.data.data) {
        for (let i = 0; i <= tokens.data.data.length - 1; i++) {
          let token = tokens.data.data[i].id;
          console.log(token, "TOKEN");
          let security =
            "https://virtserver.swaggerhub.com/AvareeWar/Test/1.0.0/securities/" +
            token +
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

          console.log(data.data, "STORE TOKEN");
          tkns.push(data.data);
        }
      }

      console.log(tkns, "STORE TOKENS");

      return dispatch(setBestTokens(tkns));
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
    case GETBESTTOKENS:
      return { ...state, besttokens: action.besttokens };
    default:
      return state; //return default empty state
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
