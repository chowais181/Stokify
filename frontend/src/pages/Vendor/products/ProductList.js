import React, { Fragment, useEffect } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Page from "../../../components/Page";
import { Link as RouterLink } from "react-router-dom";
import { Stack, Button, Container, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../../actions/vendorProductAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { DELETE_PRODUCT_RESET } from "../../../constants/vendorProductConstants";

const ProductList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { error, products } = useSelector((state) => state.vendorProducts);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure to delete this Product?")) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, isDeleted, deleteError]);

  const columns = [
    { field: "index", headerName: "#No", minWidth: 100, flex: 0.5 },
    { field: "id", headerName: "Product ID", minWidth: 300, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "category",
      headerName: "Category",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 90,
      flex: 0.5,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/dashboard/vendorproducts/product/${params.getValue(
                params.id,
                "id"
              )}`}
            >
              <Icon
                icon="clarity:edit-solid"
                color="blue"
                width="22"
                height="22"
              />
            </Link>
            <Button>
              <Icon
                onClick={() =>
                  deleteProductHandler(params.getValue(params.id, "id"))
                }
                icon="fluent:delete-24-filled"
                color="red"
                width="25"
                height="25"
              />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.map((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
        category: item.department,
      });
      return 1;
    });

  return (
    <Fragment>
      <Page title={`ALL PRODUCTS - Vendor`}>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h4" gutterBottom>
              All Products -Vendor
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/vendorproducts/newproduct"
              startIcon={<Icon icon={plusFill} />}
            >
              Add Product
            </Button>
          </Stack>

          <br />

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={13}
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            // className="productListTable"
            autoHeight
            sx={{
              m: 1,
              boxShadow: 2,
            }}
          />
        </Container>
      </Page>
    </Fragment>
  );
};

export default ProductList;
