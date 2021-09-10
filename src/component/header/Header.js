import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import CertificateModal from "../certificates/CertificateModal";
import Keycloak from "keycloak-js";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak("keycloak.json");
    keycloak.init({ onLoad: "check-sso" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      if (authenticated) {
        window.localStorage.setItem("accessToken", keycloak.token);
      }
    });
  }

  render() {
    return (
      <header>
        <Box
          sx={{
            height: 80,
            bgcolor: "darkslategray",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack
            justifyContent="flex-start"
            direction="row"
            alignItems="center"
            spacing={2}
            ml={2}
          >
            <Typography variant="h3" color="aliceblue">
              UI
            </Typography>
            <CertificateModal
              buttonText="Add new"
              title="Add Certificate"
              //   certificate={{ name: "Hello" }}
            />
          </Stack>
          {this.state.authenticated ? (
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              mr={2}
              spacing={2}
            >
              <Typography variant="h3" color="aliceblue">
                {this.state.keycloak.tokenParsed.preferred_username}
              </Typography>
              <Typography variant="h3" color="aliceblue">
                <Link
                  color="inherit"
                  underline="hover"
                  onClick={() => {
                    this.setState({
                      authenticated: false,
                    });
                    window.localStorage.removeItem("accessToken");
                    this.state.keycloak.logout();
                  }}
                >
                  Logout
                </Link>
              </Typography>
            </Stack>
          ) : (
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
                    this.state.keycloak.login().then((authenticated) => {
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
          )}
        </Box>
      </header>
    );
  }
}
