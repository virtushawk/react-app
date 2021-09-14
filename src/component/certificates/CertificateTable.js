import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import getCertificates from "./getCertificates";
import { AlertTitle, Alert, Button, Stack, TextField } from "@mui/material";
import { Collapse } from "@mui/material";
import CertificateViewModal from "./CertificateViewModal";
import CertificateModal from "./CertificateModal";
import axiosInstance from "../security/requestInterceptor";

export default class CertificateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      certificates: { content: [], totalSize: 0 },
      error: null,
      flag: true,
      searchValue: "",
    };
  }

  componentDidMount() {
    getCertificates(this.state.page, this.state.size, this.state.searchValue)
      .then((values) => {
        this.setState((state) => ({ certificates: values, error: null }));
      })
      .catch((reason) => {
        this.setState((state) => ({ error: "not authorized" }));
      });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        {this.state.error != null && (
          <Collapse in={this.state.flag}>
            <Alert
              severity="error"
              onClose={() => {
                this.setState((state) => ({ flag: false }));
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {this.state.error}
            </Alert>
          </Collapse>
        )}
        <TextField
          variant="outlined"
          fullWidth
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getCertificates(0, this.state.size, this.state.searchValue).then(
                (values) => {
                  console.log(values);
                  this.setState((state) => ({
                    certificates: values,
                    error: null,
                  }));
                }
              );
            }
          }}
          onChange={(event) => {
            this.setState((state) => ({ searchValue: event.target.value }));
          }}
        />
        <DataGrid
          columns={[
            {
              field: "createDate",
              headerName: "DateTime",
              width: 200,
            },
            {
              field: "name",
              headerName: "Title",
              width: 250,
            },
            {
              field: "tags",
              headerName: "Tags",
              width: 250,
              valueFormatter: (params) => {
                return params.row.tags
                  .map(function (elem) {
                    return elem.name;
                  })
                  .join(", ");
              },
            },
            {
              field: "description",
              headerName: "Description",
              width: 250,
            },
            {
              field: "price",
              headerName: "Price",
              width: 150,
            },
            {
              field: "actions",
              type: "actions",
              width: 250,
              renderCell: (params) => {
                return (
                  <Stack direction="row">
                    <CertificateViewModal certificate={params.row} />
                    <CertificateModal
                      type="edit"
                      buttonText="Edit"
                      title={`Edit Certificate ${params.row.id}`}
                      certificate={params.row}
                    />
                    <Button
                      color="error"
                      onClick={(e) => {
                        axiosInstance
                          .delete(
                            `http://localhost:8080/application/v3/certificates/${params.row.id}`
                          )
                          .then((response) => {
                            window.location.reload();
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                );
              },
            },
          ]}
          rows={this.state.certificates.content}
          pageSize={this.state.size}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight
          paginationMode="server"
          rowCount={this.state.certificates.totalSize}
          onPageChange={(newPage) => {
            getCertificates(newPage, this.state.size, this.state.searchValue)
              .then((values) => {
                this.setState((state) => ({
                  page: newPage,
                  certificates: values,
                  error: null,
                }));
              })
              .catch((reason) => {
                this.setState((state) => ({ error: "not authorized" }));
              });
          }}
          onPageSizeChange={(number) => {
            getCertificates(
              this.state.page,
              number,
              this.state.searchValue
            ).then((values) => {
              this.setState((state) => ({
                certificates: values,
                size: number,
              }));
            });
          }}
        />
      </div>
    );
  }
}
