import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./redux/reducer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <main>
        <Router>
          <Route path="/movie/:id">
            <Detail />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
