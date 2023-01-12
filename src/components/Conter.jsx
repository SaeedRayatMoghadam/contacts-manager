import { Action } from "@remix-run/router";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREAMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREAMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const ACTIONS = {
  INCREAMENT: "INCREAMENT",
  DECREAMENT: "DECREAMENT",
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0});

  const increament = () => {
    dispatch({ type: ACTIONS.INCREAMENT });
  };

  const decreament = () => {
    dispatch({ type: ACTIONS.DECREAMENT });
  };

  return (
    <div>
      <button onClick={increament}>INCERASE</button>
      <p style={{color: "white"}}>{state.count}</p>
      <button onClick={decreament}>DECREASE</button>
    </div>
  );
};

export default Counter;
