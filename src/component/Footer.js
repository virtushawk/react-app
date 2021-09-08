import { Box, Typography } from "@mui/material";
import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <Box sx={{ height: 80, bgcolor: "darkslategray" }}>
        <Typography variant="h4" color="aliceblue" textAlign="center">
          Roman Bruhanchik, 2021
        </Typography>
      </Box>
    );
  }
}
