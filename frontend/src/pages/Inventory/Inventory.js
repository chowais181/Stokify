import React, { useEffect, Fragment } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import "./Inventory.css";
// material
import { Button, Container, Stack, Typography, Card } from "@mui/material";
// components
import Page from "../../components/Page";
import UserProduct from "./UserProducts";

import { getProduct } from "../../actions/productAction";

import { useDispatch, useSelector } from "react-redux";
import Loader from "src/components/Loader/Loader";

import { useAlert } from "react-alert";

const Inventory = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Page title="Dashboard: Inventory | Stokify">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Available Inventory
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Icon icon={plusFill} />}
              >
                New Order
              </Button>
            </Stack>
            <Card>
              <div className="container" id="container">
                {products &&
                  products.map((product) => <UserProduct product={product} />)}
              </div>
            </Card>
          </Container>
        </Page>
      )}
    </Fragment>
  );
};

export default Inventory;
