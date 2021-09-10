import React from "react";
import { Stack, Typography, Link } from "@mui/material";

export default class LoginBlock extends React.Component {
  render() {
    if (this.props.authenticated) {
      return (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          mr={2}
          spacing={2}
        >
          <Typography variant="h3" color="aliceblue">
            {this.props.keycloak.tokenParsed}
          </Typography>
          <Typography variant="h3" color="aliceblue">
            <Link
              color="inherit"
              underline="hover"
              onClick={() => {
                this.props.keycloak
                  .login({ redirectUri: "http://localhost:3000" })
                  .then((authenticated) => {
                    this.setState({
                      authenticated: authenticated,
                    });
                    if (authenticated) {
                      window.localStorage.setItem(
                        "accessToken",
                        this.state.keycloak.token
                      );
                    }
                  });
              }}
            >
              Logout
            </Link>
          </Typography>
        </Stack>
      );
    } else {
      return (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          mr={2}
          spacing={2}
        >
          <Typography variant="h3" color="aliceblue">
            <Link
              color="inherit"
              underline="hover"
              onClick={() => {
                this.props.keycloak
                  .login({ redirectUri: "http://localhost:3000" })
                  .then((authenticated) => {
                    this.setState({
                      authenticated: authenticated,
                    });
                    if (authenticated) {
                      window.localStorage.setItem(
                        "accessToken",
                        this.state.keycloak.token
                      );
                    }
                  });
              }}
            >
              Login
            </Link>
          </Typography>
        </Stack>
      );
    }
  }
}
