import React from "react";
import { Box, Link, Stack, Typography, Button } from "@mui/material";
import CertificateModal from "./CertificateModal";

export default class Header extends React.Component {
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
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            mr={2}
          >
            <Typography variant="h3" color="aliceblue">
              <Link
                href="http://localhost:8080/application/v3/sso/login"
                color="inherit"
                underline="hover"
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </Box>
      </header>
    );
  }
}
