import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";

function Website() {
  return (
    <div>
      Entry Point
      <Header />
    </div>
  );
}

ReactDOM.render(<Website />, document.getElementById("react-entry"));
