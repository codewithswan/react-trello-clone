import React from "react";
import Board from "./Board";
import { Provider } from "react-redux";
import store from "./state/store";

function App() {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}

export default App;
