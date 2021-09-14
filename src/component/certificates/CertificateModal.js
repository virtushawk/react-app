import React from "react";
import { Button, Modal, Box, Typography, Stack } from "@mui/material";
import { WithContext as ReactTag } from "react-tag-input";
import axiosInstance from "../security/requestInterceptor";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default class CertificateModal extends React.Component {
  constructor(props) {
    super(props);
    if (props.certificate !== undefined) {
      props.certificate.tags.map((value) => {
        value.id = value.id.toString();
        return value;
      });
    }
    this.state = {
      isOpen: false,
      name:
        this.props.certificate === undefined ? "" : this.props.certificate.name,
      description:
        this.props.certificate === undefined
          ? ""
          : this.props.certificate.description,
      duration:
        this.props.certificate === undefined
          ? 0
          : this.props.certificate.duration,
      price:
        this.props.certificate === undefined ? 0 : this.props.certificate.price,
      tags:
        this.props.certificate === undefined ? [] : this.props.certificate.tags,
    };
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleTagAddition = this.handleTagAddition.bind(this);
    this.handleTagDrag = this.handleTagDrag.bind(this);
  }

  axiosPost(result) {
    axiosInstance
      .post("http://localhost:8080/application/v3/certificates", result)
      .then((response) => {
        this.setState({ isOpen: false });
        window.location.reload();
      });
  }

  axiosPut(result) {
    axiosInstance
      .put(
        `http://localhost:8080/application/v3/certificates/${this.props.certificate.id}`,
        result
      )
      .then((response) => {
        this.setState({ isOpen: false });
        window.location.reload();
      });
  }

  handleTagDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleTagAddition(tag) {
    this.setState((state) => ({ tags: [...state.tags, tag] }));
  }

  handleTagDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
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
            <ValidatorForm
              onSubmit={(e) => {
                const tags = this.state.tags.map((value) => {
                  delete value.id;
                  return value;
                });
                const result = {
                  name: this.state.name,
                  description: this.state.description,
                  duration: this.state.duration,
                  price: this.state.price,
                  tags: tags,
                };
                if (this.props.type === "create") {
                  this.axiosPost(result);
                } else {
                  this.axiosPut(result);
                }
              }}
            >
              <Stack
                spacing={3}
                direction="column"
                marginTop={2}
                marginBottom={2}
              >
                <Typography variant="h4">{this.props.title}</Typography>
                <TextValidator
                  id="name"
                  label="Title"
                  value={this.state.name}
                  onChange={(event) => {
                    const name = event.target.value;
                    this.setState({ name });
                  }}
                  validators={[
                    "required",
                    "minStringLength:6",
                    "maxStringLength:30",
                  ]}
                  errorMessages={[
                    "this field is required",
                    "Length must be more than 6",
                    "Length must be less than 30",
                  ]}
                />
                <TextValidator
                  id="description"
                  label="description"
                  value={this.state.description}
                  onChange={(event) => {
                    const description = event.target.value;
                    this.setState({ description });
                  }}
                  multiline
                  rows={4}
                  validators={[
                    "required",
                    "minStringLength:12",
                    "maxStringLength:1000",
                  ]}
                  errorMessages={[
                    "this field is required",
                    "Length must be more than 12",
                    "Length must be less than 1000",
                  ]}
                />
                <TextValidator
                  id="duration"
                  label="duration"
                  value={this.state.duration}
                  onChange={(event) => {
                    const duration = event.target.value;
                    this.setState({ duration });
                  }}
                  validators={["required", "isNumber", "minNumber:1"]}
                  errorMessages={[
                    "this field is required",
                    "Must be a number",
                    "Must be greater than 1",
                  ]}
                />
                <TextValidator
                  id="price"
                  label="price"
                  value={this.state.price}
                  onChange={(event) => {
                    const price = event.target.value;
                    this.setState({ price });
                  }}
                  validators={["required", "isFloat", "isPositive"]}
                  errorMessages={[
                    "this field is required",
                    "Must be a number",
                    "Must be positive",
                  ]}
                />
                <ReactTag
                  labelField="name"
                  tags={this.state.tags}
                  handleDelete={this.handleTagDelete}
                  handleAddition={this.handleTagAddition}
                  handleDrag={this.handleTagDrag}
                />
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
            </ValidatorForm>
          </Box>
        </Modal>
      </div>
    );
  }
}
