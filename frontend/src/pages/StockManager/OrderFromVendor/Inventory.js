import React, { useEffect, Fragment } from "react";
import { Icon } from "@iconify/react";

import "./Inventory.css";
// material
import { Container, Stack, Typography, Card, CardContent } from "@mui/material";
// components
import Page from "../../../components/Page";
import UserProduct from "./UserProducts";
import { getProduct } from "../../../actions/vendorProductAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "src/components/Loader/Loader";
import SearchNotFound from "../../../components/SearchNotFound";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

// import { ProductCartWidget } from "src/components/_dashboard/products";
//import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import { useState } from "react";
// import Inventory from "./Inventory";
// material
import { styled } from "@mui/material/styles";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const Inventory = ({ search }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.vendorProducts
  );
  let isProductNotFound = 0;
  if (loading === false) {
    isProductNotFound = products.length === 0;
  }

  //getting the keyword wich we are using in search
  // the useParam fetch the name from the url

  const { department } = useParams();
  const [name, setKeyword] = useState("");

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct(department));
  }, [dispatch, error, alert, department]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Page title="Dashboard: Order | Stokify">
          {/* <ProductCartWidget /> */}
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={4}
            >
              <Typography variant="h4" gutterBottom>
                Available Products
              </Typography>
            </Stack>

            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <SearchStyle
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search product..."
                  startAdornment={
                    <InputAdornment position="end">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  }
                />
                {isProductNotFound && <SearchNotFound searchQuery={name} />}
                <div className="container" id="container">
                  {products &&
                    products
                      .filter((filteredProducts) =>
                        filteredProducts.name.includes(name)
                      )
                      .map((product) => <UserProduct product={product} />)}
                </div>
              </CardContent>
            </Card>
          </Container>
        </Page>
      )}
    </Fragment>
  );
};

export default Inventory;
