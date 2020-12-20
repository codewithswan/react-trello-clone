import React from "react";
import { Board } from "./Board";
import { Provider } from "react-redux";
import store from "./store";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Provider store={store}>
      <ToastContainer  position="top-right" autoClose={5000} hideProgressBar={true}  />
      <Board />
    </Provider>
  );
}

export default App;
