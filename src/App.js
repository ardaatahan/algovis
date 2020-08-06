import React, { Component } from "react";
import "./App.css";

import Algovis from "./components/Algovis/Algovis";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Algovis />
      </div>
    );
  }
}
