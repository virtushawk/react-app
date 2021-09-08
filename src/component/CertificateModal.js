import React from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { width } from "@mui/system";

export default class CertificateModal extends React.Component {
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
          variant="contained"
        >
          {this.props.buttonText}
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
            <form
              action="http://localhost:8080/application/v3/certificates"
              method="post"
            >
              <Stack
                spacing={3}
                direction="column"
                marginTop={2}
                marginBottom={2}
              >
                <Typography variant="h4">{this.props.title}</Typography>
                <TextField
                  required
                  id="Title"
                  label="Title"
                  defaultValue={
                    this.props.certificate === undefined
                      ? ""
                      : this.props.certificate.name
                  }
                ></TextField>
                <TextField
                  required
                  id="description"
                  label="description"
                  defaultValue={
                    this.props.certificate === undefined
                      ? ""
                      : this.props.certificate.description
                  }
                  multiline
                  rows={4}
                ></TextField>
                <TextField
                  required
                  id="duration"
                  label="duration"
                  defaultValue={
                    this.props.certificate === undefined
                      ? ""
                      : this.props.certificate.duration
                  }
                ></TextField>
                <TextField
                  required
                  id="price"
                  label="price"
                  defaultValue={
                    this.props.certificate === undefined
                      ? ""
                      : this.props.certificate.price
                  }
                ></TextField>
                <TextField
                  required
                  id="tags"
                  label="tags"
                  defaultValue={
                    this.props.certificate === undefined
                      ? ""
                      : this.props.certificate.tags
                  }
                ></TextField>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Button type="submit" variant="text">
                    Save
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => {
                      this.setState((state) => ({
                        isOpen: false,
                      }));
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}
