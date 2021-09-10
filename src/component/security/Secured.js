import React, { Component } from "react";
import Keycloak from "keycloak-js";

export default class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { Keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak("keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      if (authenticated) {
        window.localStorage.setItem("accessToken", keycloak.token);
        console.log(keycloak.token);
      }
    });
  }

  render() {
    return <div></div>;
  }
}
