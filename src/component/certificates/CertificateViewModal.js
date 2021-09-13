import React from "react";
import { Button, Modal, Box, Typography, Stack } from "@mui/material";

export default class CertificateViewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.setState((state) => ({
              isOpen: true,
            }));
          }}
        >
          View
        </Button>
        <Modal
          open={this.state.isOpen}
          onClose={() => {
            this.setState((state) => ({
              isOpen: false,
            }));
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: "background.paper",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack
              spacing={3}
              direction="column"
              marginTop={2}
              marginBottom={2}
            >
              <Typography variant="h4">
                {this.props.certificate === undefined
                  ? ""
                  : this.props.certificate.name}
              </Typography>
              <Typography variant="h6">
                {this.props.certificate === undefined
                  ? ""
                  : this.props.certificate.description}
              </Typography>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  }
}
