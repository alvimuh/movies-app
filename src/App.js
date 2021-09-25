import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./redux/reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <main>
        <Home />
      </main>
    </Provider>
  );
}

export default App;
