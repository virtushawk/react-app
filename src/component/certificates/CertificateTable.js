import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import getCertificates from "./getCertificates";
import { AlertTitle, Alert } from "@mui/material";
import { Collapse } from "@mui/material";

export default class CertificateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      certificates: [],
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
              headerName: "Actions",
              width: 150,
            },
          ]}
          rows={this.state.certificates}
          pageSize={this.state.size}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight
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
