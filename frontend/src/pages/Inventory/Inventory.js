import React, { useEffect, Fragment } from "react";
// import { Icon } from "@iconify/react";

import "./Inventory.css";
// material
import { Container, Stack, Typography, Card } from "@mui/material";
// components
import Page from "../../components/Page";
import UserProduct from "./UserProducts";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "src/components/Loader/Loader";
import SearchNotFound from "../../components/SearchNotFound";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import SearchToolBar from "./SearchToolBar";
import { ProductCartWidget } from "src/components/_dashboard/products";
//
const Inventory = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  let isProductNotFound = 0;
  if (loading === false) {
    isProductNotFound = products.length === 0;
  }

  //getting the keyword wich we are using in search
  // the useParam fetch the name from the url

  const { department, name } = useParams();

  // console.log(department,name);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct(department, name));
  }, [dispatch, error, alert, department, name]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Page title="Dashboard: Inventory | Stokify">
          <ProductCartWidget />
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={4}
            >
              <Typography variant="h4" gutterBottom>
                Available Inventory
              </Typography>
            </Stack>

            <Card>
              <SearchToolBar />
              {isProductNotFound && <SearchNotFound searchQuery={name} />}
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
