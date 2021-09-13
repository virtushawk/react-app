import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import getCertificates from "./getCertificates";
import { AlertTitle, Alert, Button, Stack } from "@mui/material";
import { Collapse } from "@mui/material";
import CertificateViewModal from "./CertificateViewModal";
import CertificateModal from "./CertificateModal";

export default class CertificateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      certificates: { content: [], totalSize: 0 },
      error: null,
      flag: true,
    };
  }

  componentDidMount() {
    getCertificates(this.state.page, this.state.size)
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
                const onClick = () => {};
                return (
                  <Stack direction="row">
                    <CertificateViewModal certificate={params.row} />
                    <CertificateModal
                      buttonText="Edit"
                      title={`Edit Certificate ${params.row.id}`}
                      certificate={params.row}
                    />
                    <Button color="error" onClick={onClick}>
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
            getCertificates(newPage, this.state.size)
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
            getCertificates(this.state.page, number).then((values) => {
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
