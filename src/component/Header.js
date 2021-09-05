import React from "react";

import "./Header.css";

export default class Header extends React.Component {
  render() {
    return (
      <header className="component-header">
        <div className="component-header-logoBlock">
          <span className="component-header-logoBlock-text">UI</span>
        </div>
      </header>
    );
  }
}
